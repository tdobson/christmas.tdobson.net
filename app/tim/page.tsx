import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../../components/GiftGuidelines';
import { GiftListClient } from '../../components/GiftList/GiftListClient';
import { ShareGiftList } from '../../components/ShareGiftList';

const categories = [
  { key: 'do_not_buy', title: 'Please Don\'t Buy', icon: 'IconAlertCircle', color: '#FA5252' },
  { key: 'outdoor', title: 'Outdoor & Adventure', icon: 'IconMountain', color: '#228BE6' },
  { key: 'tech', title: 'Tech & Equipment', icon: 'IconDevices', color: '#1C7ED6' },
  { key: 'books', title: 'Books & Reading', icon: 'IconBook', color: '#7048E8' },
  { key: 'education', title: 'Courses & Learning', icon: 'IconCertificate', color: '#7048E8' },
  { key: 'food', title: 'Food & Drink', icon: 'IconTools', color: '#FD7E14' },
  { key: 'home', title: 'Home & Furniture', icon: 'IconHome', color: '#40C057' },
  { key: 'support', title: 'Time & Support', icon: 'IconHeart', color: '#E64980' },
];

export default function TimListPage() {
  return (
    <Stack gap="md">
      <Title order={1} style={{ whiteSpace: 'nowrap' }}>Tim's Gift Ideas</Title>
      <GiftGuidelines />
      <GiftListClient recipient="tim" categories={categories} />
      <ShareGiftList />
    </Stack>
  );
}
