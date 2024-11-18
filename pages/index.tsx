import { Title, Text, Stack, Card } from '@mantine/core';

export default function HomePage() {
  return (
    <Stack gap="md">
      <Title order={1}>Welcome to Christmas 2024 Planning</Title>
      <Text>Use this site to coordinate Christmas gifts and schedules for the holiday season.</Text>
      
      <Card withBorder>
        <Text>
          Navigate using the menu to view gift lists and schedule information. 
          You can find James's list, the adults' gift exchange list, and our holiday schedule.
        </Text>
      </Card>
    </Stack>
  );
}
