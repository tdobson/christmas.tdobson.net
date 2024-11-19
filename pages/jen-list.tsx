import { Title, Stack, Card, Text, List, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function JenListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Jen's Gift List</Title>

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
          <Title order={3}>Priority Items</Title>
          <List>
            <List.Item>Baby wearing coat (£85)</List.Item>
            <List.Item>Additional baby monitor screens/equipment</List.Item>
            <List.Item>Additional chargers for current monitor (Specific model: BT6000)</List.Item>
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
