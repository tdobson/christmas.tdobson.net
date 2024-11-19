import { Title, Stack, Card, Text, List, Alert } from '@mantine/core';
import {
  IconAlertCircle,
  IconTools,
  IconHeart,
  IconMountain,
  IconBook,
  IconStar
} from '@tabler/icons-react';
import giftData from '../config/tim-gifts.json';

// Type definitions
type IconName = 'IconStar' | 'IconTools' | 'IconHeart' | 'IconMountain' | 'IconBook';

interface GiftItem {
  name: string;
  shortDescription: string;
  longDescription?: string;
  category: string;
  icon: IconName;
  url: string;
}

interface Category {
  title: string;
  icon: IconName;
  color: string;
}

// Icon mapping
const iconComponents = {
  IconStar,
  IconTools,
  IconHeart,
  IconMountain,
  IconBook,
};

export default function TimListPage() {
  // Group items by category
  const itemsByCategory = giftData.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GiftItem[]>);

  return (
    <Stack gap="md">
      <Title order={1}>Tim's Gift List</Title>

      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Gift-Giving Guidelines"
        color="blue"
      >
        <List>
          <List.Item>Second-hand items are welcomed and encouraged</List.Item>
          <List.Item>Practical/useful items preferred over decorative</List.Item>
          <List.Item>Help with tasks/time is often more valuable than physical items</List.Item>
          <List.Item>Consider helping with research/planning when giving money towards items</List.Item>
        </List>
      </Alert>

      <Card withBorder>
        <Stack gap="sm">
          {Object.entries(giftData.categories).map(([categoryKey, category]) => {
            const items = itemsByCategory[categoryKey] || [];
            const IconComponent = iconComponents[category.icon as IconName];

            return (
              <React.Fragment key={categoryKey}>
                <Title order={3}>{category.title}</Title>
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={<IconComponent size="1rem" style={{ color: category.color }} />}
                >
                  {items.map((item) => (
                    <List.Item key={item.name}>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                      {item.shortDescription && ` - ${item.shortDescription}`}
                      {item.longDescription && (
                        <Text size="xs" c="dimmed">
                          {item.longDescription}
                        </Text>
                      )}
                    </List.Item>
                  ))}
                </List>
              </React.Fragment>
            );
          })}

          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Note"
            color="blue"
          >
            <Text size="sm">Currently have plenty of books - prefer other gifts unless specifically listed</Text>
            <Text size="sm">Amazon wishlist: https://www.amazon.co.uk/hz/wishlist/ls/7AXWFJB4G301</Text>
          </Alert>
        </Stack>
      </Card>
    </Stack>
  );
}