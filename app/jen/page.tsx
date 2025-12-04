import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../../components/GiftGuidelines';
import { GiftListClient } from '../../components/GiftList/GiftListClient';
import { ShareGiftList } from '../../components/ShareGiftList';

const categories = [
  { key: 'home', title: 'Home & Garden', icon: 'IconHome', color: '#40C057' },
  { key: 'food', title: 'Food & Treats', icon: 'IconTools', color: '#FD7E14' },
  { key: 'clothing', title: 'Clothing & Accessories', icon: 'IconJacket', color: '#BE4BDB' },
  { key: 'books', title: 'Books & Reading', icon: 'IconBook', color: '#7048E8' },
  { key: 'wellbeing', title: 'Health & Wellbeing', icon: 'IconHeart', color: '#E64980' },
  { key: 'support', title: 'Support & Time', icon: 'IconHeartHandshake', color: '#E64980' },
];

export default function JenListPage() {
  return (
    <Stack gap="md">
      <Title order={1} style={{ whiteSpace: 'nowrap' }}>Jen's Gift Ideas</Title>
      <GiftGuidelines />
      <GiftListClient recipient="jen" categories={categories} />
      <ShareGiftList />
    </Stack>
  );
}
