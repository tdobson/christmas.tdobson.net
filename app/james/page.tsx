import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../../components/GiftGuidelines';
import { GiftListClient } from '../../components/GiftList/GiftListClient';
import { ShareGiftList } from '../../components/ShareGiftList';

const categories = [
  { key: 'do_not_buy', title: 'Please Don\'t Buy', icon: 'IconAlertCircle', color: '#FA5252' },
  { key: 'active', title: 'Active Play', icon: 'IconSteeringWheel', color: '#228BE6' },
  { key: 'learning', title: 'Learning & Development', icon: 'IconBook', color: '#7048E8' },
  { key: 'outdoor', title: 'Outdoor Adventure', icon: 'IconMountain', color: '#228BE6' },
  { key: 'food', title: 'Food & Snacks', icon: 'IconMoodSmile', color: '#FD7E14' },
];

export default function JamesListPage() {
  return (
    <Stack gap="md">
      <Title order={1} style={{ whiteSpace: 'nowrap' }}>James's Gift Ideas</Title>
      <GiftGuidelines />
      <GiftListClient recipient="james" categories={categories} />
      <ShareGiftList />
    </Stack>
  );
}
