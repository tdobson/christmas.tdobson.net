import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import { GiftList } from '../components/GiftList';
import { ShareGiftList } from '../components/ShareGiftList';
import giftData from '../config/tim-gifts.json';
import type { GiftData } from '../components/GiftList';

export default function TimListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Tim's Gift Ideas 🎁</Title>
      <ShareGiftList />
      <GiftGuidelines />
      <GiftList giftData={giftData as GiftData} />
    </Stack>
  );
}
