import { Title, Stack, Card, Text, List } from '@mantine/core';

export default function AdultsListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>Adults Gift Exchange</Title>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Gift Exchange Rules</Title>
          <List>
            <List.Item>Budget: $50 per person</List.Item>
            <List.Item>Draw names on Thanksgiving</List.Item>
            <List.Item>One gift per person</List.Item>
            <List.Item>Include gift receipt</List.Item>
          </List>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Gift Ideas</Title>
          <List>
            <List.Item>Kitchen gadgets</List.Item>
            <List.Item>Books</List.Item>
            <List.Item>Gift cards</List.Item>
            <List.Item>Hobby supplies</List.Item>
            <List.Item>Local experiences</List.Item>
          </List>
        </Stack>
      </Card>
    </Stack>
  );
}
