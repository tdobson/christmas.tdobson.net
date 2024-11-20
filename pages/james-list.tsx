import React from 'react';
import { Title, Stack, Card, Text, List, Alert } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import {
  IconStar,
  IconGift,
  IconBike,
  IconSquare,
  IconScissors,
  IconPhoto,
  IconMath,
  IconDeviceSpeaker,
  IconShoe,
  IconHook,
  IconLifebuoy,
  IconApple,
  IconBallFootball,
  IconAlertCircle,
  IconBan
} from '@tabler/icons-react';
import giftDataImport from '../config/james-gifts.json';

// Type definitions
interface GiftData {
  categories: Record<string, Category>;
  items: GiftItem[];
  doNotBuy: string[];
  notes: {
    checkFirst: string;
  };
}

type IconName = 'IconStar' | 'IconGift' | 'IconBike' | 'IconSquare' | 'IconScissors' | 
  'IconPhoto' | 'IconMath' | 'IconDeviceSpeaker' | 'IconShoe' | 'IconHook' | 
  'IconLifebuoy' | 'IconApple' | 'IconBallFootball';

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
  IconGift,
  IconBike,
  IconSquare,
  IconScissors,
  IconPhoto,
  IconMath,
  IconDeviceSpeaker,
  IconShoe,
  IconHook,
  IconLifebuoy,
  IconApple,
  IconBallFootball
};

export default function JamesListPage() {
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
      <Title order={1}>James's Gift List</Title>

      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Important Note"
        color="red"
      >
        {giftData.notes.checkFirst}
      </Alert>

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

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2} c="red">Please Do Not Buy</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconBan size="1rem" style={{ color: "#FA5252" }} />}
          >
            {giftData.doNotBuy.map((item) => (
              <List.Item key={item}>{item}</List.Item>
            ))}
          </List>
        </Stack>
      </Card>
    </Stack>
  );
}
