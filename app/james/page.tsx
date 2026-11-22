import { Alert, Stack, Text, Title } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
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
      <Alert
        variant="light"
        color="pink"
        radius="md"
        title="The best present for James is your time"
        icon={<IconHeart />}
      >
        <Text size="sm" mb="xs">
          James does love a wrapped present. But stuff gets lost in the pile pretty quickly, and
          the things he remembers are the times people spent with him.
        </Text>
        <Text size="sm">
          So if you can, take him out. An ice cream (he'll happily eat one in December), a walk, a
          picnic, whatever you fancy doing. Anything you can do with him yourselves, without mum or
          dad tagging along, is perfect. He'll love it, and you'll both remember it far longer than
          anything we could wrap up.
        </Text>
      </Alert>
      <GiftGuidelines />
      <GiftListClient recipient="james" categories={categories} />
      <ShareGiftList />
    </Stack>
  );
}
