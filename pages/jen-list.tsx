import React from 'react';
import { Title, Stack, Card, Text, List } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import {
  IconStar,
  IconHeartHandshake,
  IconHome,
  IconUsers,
  IconDevices,
  IconJacket,
  IconDeviceTv,
  IconPlug,
  IconPlant,
  IconUsb
} from '@tabler/icons-react';
import giftDataImport from '../config/jen-gifts.json';

// Type definitions
interface GiftData {
  categories: Record<string, Category>;
  items: GiftItem[];
}

type IconName = 'IconStar' | 'IconHeartHandshake' | 'IconHome' | 'IconUsers' | 
  'IconDevices' | 'IconJacket' | 'IconDeviceTv' | 'IconPlug' | 'IconPlant' | 'IconUsb';

interface GiftItem {
  name: string;
  shortDescription?: string;
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

// Convert imported data to typed data
const giftData = giftDataImport as GiftData;

// Icon mapping
const iconComponents = {
  IconStar,
  IconHeartHandshake,
  IconHome,
  IconUsers,
  IconDevices,
  IconJacket,
  IconDeviceTv,
  IconPlug,
  IconPlant,
  IconUsb
};

export default function JenListPage() {
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
      <Title order={1}>Jen's Gift Ideas 🎁</Title>

      <GiftGuidelines />

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
                >
                  {items.map((item) => {
                    const ItemIcon = iconComponents[item.icon as IconName];
                    return (
                      <List.Item 
                        key={item.name}
                        icon={<ItemIcon size="1rem" style={{ color: category.color }} />}
                      >
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
                    );
                  })}
                </List>
              </React.Fragment>
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}
