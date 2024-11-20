import React from 'react';
import { Title, Stack, Card, Text, List, Alert } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import {
  IconTools,
  IconHeart,
  IconMountain,
  IconBook,
  IconStar,
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
  IconAlertCircle
} from '@tabler/icons-react';
import giftDataImport from '../config/tim-gifts.json';

// Type definitions
interface GiftData {
  categories: Record<string, Category>;
  items: GiftItem[];
  notes: {
    bookNote: string;
    wishlistUrl: string;
  };
}
type IconName = 'IconStar' | 'IconTools' | 'IconHeart' | 'IconMountain' | 'IconBook' | 'IconArmchair' | 'IconMap' | 'IconCertificate' | 'IconPlug' | 'IconSwimming' | 'IconUsb' | 'IconDeviceFloppy' | 'IconHeadphones' | 'IconLine' | 'IconLink' | 'IconJacket' | 'IconBook2' | 'IconRobot' | 'IconBabyCarriage' | 'IconPhoto' | 'IconWood' | 'IconMoodSmile' | 'IconSteeringWheel';

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

// Convert imported data to typed data
const giftData = giftDataImport as GiftData;

// Icon mapping
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

          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Note"
            color="blue"
          >
            <Text size="sm">{giftData.notes.bookNote}</Text>
            <Text size="sm">
              Amazon wishlist: <a href={giftData.notes.wishlistUrl} target="_blank" rel="noopener noreferrer">
                {giftData.notes.wishlistUrl}
              </a>
            </Text>
          </Alert>
        </Stack>
      </Card>
    </Stack>
  );
}
