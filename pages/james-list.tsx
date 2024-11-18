import { Title, List, Stack, Card, Text } from '@mantine/core';

export default function JamesListPage() {
  return (
    <Stack gap="md">
      <Title order={1}>James's Christmas List</Title>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Toys & Games</Title>
          <List>
            <List.Item>LEGO Star Wars sets</List.Item>
            <List.Item>Remote control car</List.Item>
            <List.Item>Nintendo Switch games</List.Item>
            <List.Item>Science experiment kit</List.Item>
          </List>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Books & Learning</Title>
          <List>
            <List.Item>Dinosaur encyclopedia</List.Item>
            <List.Item>Magic Tree House series books</List.Item>
            <List.Item>Space-themed picture books</List.Item>
          </List>
        </Stack>
      </Card>

      <Text size="sm" c="dimmed">
        Note: This list will be updated as new items are added.
      </Text>
    </Stack>
  );
}
