'use client';
import { useMemo } from 'react';
import { Stack, Card, Title, SimpleGrid, Alert, Loader, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useGifts, GiftWithClaim } from '@/hooks/useGifts';
import { GiftCard } from '@/components/GiftCard/GiftCard';
import ctaVariations from '@/config/cta-variations.json';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface Category {
  key: string;
  title: string;
  icon: string;
  color: string;
}

interface GiftListClientProps {
  recipient: string;
  categories: Category[];
  checkFirstNote?: string;
}

export function GiftListClient({
  recipient,
  categories,
  checkFirstNote,
}: GiftListClientProps) {
  const { data: gifts, isLoading, error } = useGifts(recipient);

  // Create a map of gift ID to unique CTA text (shuffled, no duplicates on page)
  // Must be called before any conditional returns to comply with hooks rules
  const ctaMap = useMemo(() => {
    if (!gifts || gifts.length === 0) return {};
    const shuffledCtas = shuffleArray(ctaVariations.claimButtonTexts);
    const map: Record<string, string> = {};
    gifts.forEach((gift, index) => {
      // Cycle through shuffled CTAs if more gifts than CTAs
      map[gift.id] = shuffledCtas[index % shuffledCtas.length];
    });
    return map;
  }, [gifts]);

  if (isLoading) {
    return (
      <Stack gap="md" align="center" py="xl">
        <Loader size="lg" />
        <Text c="dimmed">Loading gifts...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Error"
        color="red"
      >
        Failed to load gifts. Please try again later.
      </Alert>
    );
  }

  if (!gifts || gifts.length === 0) {
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="No gifts found"
        color="blue"
      >
        No gifts have been added yet.
      </Alert>
    );
  }

  // Group gifts by category
  const giftsByCategory = gifts.reduce(
    (acc, gift) => {
      if (!acc[gift.category_key]) {
        acc[gift.category_key] = [];
      }
      acc[gift.category_key].push(gift);
      return acc;
    },
    {} as Record<string, GiftWithClaim[]>
  );

  return (
    <Stack gap="sm">
      {checkFirstNote && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Can we help?"
          color="orange"
        >
          {checkFirstNote}
        </Alert>
      )}

      <Card withBorder>
        <Stack gap="sm">
          {categories.map((category) => {
            const categoryGifts = giftsByCategory[category.key] || [];

            if (categoryGifts.length === 0) {
              return null;
            }

            return (
              <div key={category.key}>
                <Title order={3}>{category.title}</Title>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
                  {categoryGifts.map((gift) => (
                    <GiftCard
                      key={gift.id}
                      gift={gift}
                      categoryColor={category.color}
                      recipient={recipient}
                      ctaText={ctaMap[gift.id]}
                    />
                  ))}
                </SimpleGrid>
              </div>
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}
