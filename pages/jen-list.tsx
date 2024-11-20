import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import { GiftList } from '../components/GiftList';
import giftData from '../config/jen-gifts.json';
import type { GiftData } from '../components/GiftList';

export default function JenListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Jen's Gift Ideas 🎁</Title>
      <GiftGuidelines />
      <GiftList giftData={giftData as GiftData} />
    </Stack>
  );
}
