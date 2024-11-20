import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import { GiftList } from '../components/GiftList';
import giftData from '../config/james-gifts.json';
import type { GiftData } from '../components/GiftList';

export default function JamesListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>James's Gift Ideas 🧸</Title>
      <GiftGuidelines />
      <GiftList giftData={giftData as GiftData} />
    </Stack>
  );
}
