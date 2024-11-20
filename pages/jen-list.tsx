import { Title, Stack } from '@mantine/core';
import { GiftGuidelines } from '../components/GiftGuidelines';
import { GiftList } from '../components/GiftList';
import giftData from '../config/jen-gifts.json';

export default function JenListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Jen's Gift Ideas 🎁</Title>
      <GiftGuidelines />
      <GiftList giftData={giftData} />
    </Stack>
  );
}
