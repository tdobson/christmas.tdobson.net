import { Title, Stack, Card, Text, List, Alert } from '@mantine/core';
import { IconAlertCircle, IconGift, IconTools, IconHeart } from '@tabler/icons-react';

export default function AdultsListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Adults Gift Lists</Title>

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
          <Title order={2}>Tim's List</Title>
          <Title order={3}>Tech/Practical Items</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconTools size="1rem" style={{ color: '#228BE6' }} />}
          >
            <List.Item>USB-C to USB-A cables (3-6 needed)</List.Item>
            <List.Item>Additional laptop power supplies (2 needed)</List.Item>
            <List.Item>WiFi router upgrade for better home network speed</List.Item>
            <List.Item>Set of Allen keys</List.Item>
            <List.Item>Secateurs (sharp ones)</List.Item>
          </List>
          <Title order={3}>Other Ideas</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconHeart size="1rem" style={{ color: '#40C057' }} />}
          >
            <List.Item>Technical Gore-tex waterproof jacket</List.Item>
            <List.Item>Firewood</List.Item>
            <List.Item>AI credits</List.Item>
            <List.Item>Christmas that isn't stressful</List.Item>
          </List>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Jen's List</Title>
          <Title order={3}>Priority Items</Title>
          <List>
            <List.Item>Burke Harris jacket upgrade (waterproof technical coat)</List.Item>
            <List.Item>Additional baby monitor screens/equipment</List.Item>
            <List.Item>Additional chargers for current monitor (Specific model: DC babysitter)</List.Item>
          </List>
          <Title order={3}>Other Ideas</Title>
          <List>
            <List.Item>Money towards massages</List.Item>
            <List.Item>House plants and pots</List.Item>
            <List.Item>Time with helpers for sorting/organizing</List.Item>
            <List.Item>Additional USB-C cables and chargers</List.Item>
          </List>
        </Stack>
      </Card>
    </Stack>
  );
}
