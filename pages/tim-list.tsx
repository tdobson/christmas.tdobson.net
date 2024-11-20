import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import { GiftList } from '../components/GiftList';
import giftData from '../config/tim-gifts.json';

export default function TimListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Tim's Gift Ideas 🎁</Title>
      <GiftGuidelines />
      <GiftList giftData={giftData} />
    </Stack>
  );
}
