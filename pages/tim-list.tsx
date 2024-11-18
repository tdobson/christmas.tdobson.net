import { Title, Stack, Card, Text, List, Alert } from '@mantine/core';
import {
  IconAlertCircle,
  IconTools,
  IconHeart,
  IconMountain,
  IconBook,
  IconStar
} from '@tabler/icons-react';

export default function TimListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Tim's Gift List</Title>

      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Gift-Giving Guidelines"
        color="blue"
      >
        <List>
          <List.Item>Second-hand items are welcomed and encouraged</List.Item>
          <List.Item>Practical/useful items preferred over decorative</List.Item>
          <List.Item>Help with tasks/time is often more valuable than physical items</List.Item>
          <List.Item>Consider helping with research/planning when giving money towards items</List.Item>
        </List>
      </Alert>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={3}>High Priority</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconStar size="1rem" style={{ color: '#FFD700' }} />}
          >
            <List.Item>Poang chair (second hand is great) - for working in</List.Item>
            <List.Item>Moorland Grit guidebook (North-West Peak District)</List.Item>
            <List.Item>Chainsaw cutting course/qualifications</List.Item>
            <List.Item>170W ThinkPad Chargers (second hand from eBay)</List.Item>
            <List.Item>Wetsuit (large) - 3mm or 5mm</List.Item>
          </List>

          <Title order={3}>Tech & Equipment</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconTools size="1rem" style={{ color: '#228BE6' }} />}
          >
            <List.Item>USB-C to USB-A cables (3-6 needed)</List.Item>
            <List.Item>Bluetooth speaker (second hand is fine)</List.Item>
            <List.Item>5TB 2.5" Internal Hard Drive for laptop</List.Item>
            <List.Item>Basic headphones (always useful to have extras)</List.Item>
          </List>

          <Title order={3}>Outdoor & Climbing</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconMountain size="1rem" style={{ color: '#40C057' }} />}
          >
            <List.Item>3m tape sling from climbing shop</List.Item>
            <List.Item>Whetman HMS screwgate karabiner</List.Item>
            <List.Item>Technical Gore-tex waterproof jacket</List.Item>
            <List.Item>OS Map: Raasay and Applecross (Sheet 24)</List.Item>
          </List>

          <Title order={3}>Books & Media</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconBook size="1rem" style={{ color: '#7048E8' }} />}
          >
            <List.Item>"Wild Spirit" by Helen Lloyd</List.Item>
            <List.Item>Walking in Torridon guidebook</List.Item>
            <List.Item>AI credits</List.Item>
          </List>

          <Title order={3}>Time & Support</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconHeart size="1rem" style={{ color: '#E64980' }} />}
          >
            <List.Item>Babysitting (even 30 minutes is appreciated)</List.Item>
            <List.Item>Sentimental items - photos or personal memories</List.Item>
            <List.Item>Firewood</List.Item>
            <List.Item>A stress-free Christmas</List.Item>
          </List>

          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Note"
            color="blue"
          >
            <Text size="sm">Currently have plenty of books - prefer other gifts unless specifically listed</Text>
            <Text size="sm">Amazon wishlist: https://www.amazon.co.uk/hz/wishlist/ls/7AXWFJB4G301</Text>
          </Alert>
        </Stack>
      </Card>
    </Stack>
  );
}
