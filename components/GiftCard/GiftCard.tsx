'use client';
import { useState, useMemo } from 'react';
import { Paper, Text, Button, Badge, Stack } from '@mantine/core';
import { IconGift, IconCheck } from '@tabler/icons-react';
import { GiftWithClaim } from '@/hooks/useGifts';
import { ClaimModal } from '@/components/ClaimModal/ClaimModal';
import ctaVariations from '@/config/cta-variations.json';

// Icon mapping - same as in GiftList.tsx
import {
  IconStar,
  IconTools,
  IconHeart,
  IconMountain,
  IconBook,
  IconArmchair,
  IconMap,
  IconCertificate,
  IconPlug,
  IconSwimming,
  IconUsb,
  IconDeviceFloppy,
  IconHeadphones,
  IconLine,
  IconLink,
  IconJacket,
  IconBook2,
  IconRobot,
  IconBabyCarriage,
  IconPhoto,
  IconWood,
  IconMoodSmile,
  IconSteeringWheel,
  IconDeviceTv,
  IconGlass,
  IconPlant,
  IconUsers,
  IconDevices,
  IconHeartHandshake,
  IconHome,
  IconBulb,
  IconSock,
  IconKeyboard,
  IconCar,
  IconFirstAidKit,
  IconCake,
  IconToolsKitchen,
  IconBox,
  IconCup,
} from '@tabler/icons-react';

const iconComponents = {
  IconStar,
  IconTools,
  IconHeart,
  IconMountain,
  IconBook,
  IconArmchair,
  IconMap,
  IconCertificate,
  IconPlug,
  IconSwimming,
  IconUsb,
  IconDeviceFloppy,
  IconHeadphones,
  IconLine,
  IconLink,
  IconJacket,
  IconBook2,
  IconRobot,
  IconBabyCarriage,
  IconPhoto,
  IconWood,
  IconMoodSmile,
  IconSteeringWheel,
  IconDeviceTv,
  IconGift,
  IconGlass,
  IconPlant,
  IconUsers,
  IconDevices,
  IconHeartHandshake,
  IconHome,
  IconBulb,
  IconSock,
  IconKeyboard,
  IconCar,
  IconFirstAidKit,
  IconCake,
  IconToolsKitchen,
  IconBox,
  IconCup,
};

interface GiftCardProps {
  gift: GiftWithClaim;
  categoryColor: string;
  recipient: string;
}

export function GiftCard({ gift, categoryColor, recipient }: GiftCardProps) {
  const [modalOpened, setModalOpened] = useState(false);

  // Pick a random CTA text based on gift id for consistency
  const ctaText = useMemo(() => {
    const texts = ctaVariations.claimButtonTexts;
    // Use gift id hash to get consistent but varied selection
    const hash = gift.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return texts[hash % texts.length];
  }, [gift.id]);

  const ItemIcon = gift.icon
    ? iconComponents[gift.icon as keyof typeof iconComponents]
    : IconGift;

  const isClaimed = gift.isClaimed && !gift.allow_multiple;
  const claimCount = gift.claimCount || 0;

  const content = (
    <Paper
      shadow="xs"
      p="md"
      withBorder
      style={{
        cursor: gift.url ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        opacity: isClaimed ? 0.6 : 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ItemIcon size="1.2rem" style={{ color: categoryColor }} />
          <Text fw={500} size="lg">
            {gift.name}
          </Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {gift.price_indicator && (
            <Badge color="gray" variant="light" size="sm">
              {gift.price_indicator}
            </Badge>
          )}
          {isClaimed && (
            <Badge color="green" size="sm" leftSection={<IconCheck size="0.8rem" />}>
              Claimed
            </Badge>
          )}
        </div>
      </div>

      {gift.short_description && (
        <Text size="sm" c="dimmed">
          {gift.short_description}
        </Text>
      )}

      {gift.long_description && (
        <Text size="xs" c="dimmed">
          {gift.long_description}
        </Text>
      )}

      {Boolean(gift.allow_multiple) && claimCount > 0 && (
        <Text size="xs" c="blue">
          Claimed by {claimCount} {claimCount === 1 ? 'person' : 'people'}
        </Text>
      )}

      <Stack gap="xs" mt="auto">
        {gift.url && (
          <Text size="xs" c="blue">
            Click to view →
          </Text>
        )}

        <Button
          variant={isClaimed ? 'light' : 'filled'}
          color={isClaimed ? 'gray' : 'blue'}
          size="sm"
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isClaimed) {
              setModalOpened(true);
            }
          }}
          disabled={isClaimed}
          leftSection={isClaimed ? <IconCheck size="1rem" /> : <IconGift size="1rem" />}
        >
          {isClaimed ? 'Already Claimed' : ctaText}
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <>
      {gift.url ? (
        <a
          href={gift.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
          onClick={(e) => {
            // Don't follow link if clicking the button
            if ((e.target as HTMLElement).closest('button')) {
              e.preventDefault();
            }
          }}
        >
          {content}
        </a>
      ) : (
        content
      )}

      <ClaimModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        giftId={gift.id}
        giftName={gift.name}
        recipient={recipient}
      />
    </>
  );
}
