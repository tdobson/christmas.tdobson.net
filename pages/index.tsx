import { Title, Text, Stack, Card, Paper, Group, SimpleGrid } from '@mantine/core';
import { IconGift, IconCalendar } from '@tabler/icons-react';
import Link from 'next/link';

export default function HomePage() {
  const navigationItems = [
    {
      title: "James's List",
      description: "Gift ideas for James",
      href: "/james-list",
      icon: IconGift,
      color: "blue",
    },
    {
      title: "Tim's List",
      description: "Gift ideas for Tim",
      href: "/tim-list",
      icon: IconGift,
      color: "green",
    },
    {
      title: "Jen's List",
      description: "Gift ideas for Jen",
      href: "/jen-list",
      icon: IconGift,
      color: "grape",
    },
    {
      title: "Schedule",
      description: "Christmas 2024 timeline",
      href: "/schedule",
      icon: IconCalendar,
      color: "red",
    },
  ];

  return (
    <Stack gap="md">
      <Title order={1}>Welcome to Christmas 2024 Planning</Title>
      <Text>Use this site to coordinate Christmas gifts and schedules for the holiday season.</Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {navigationItems.map((item) => (
          <Paper
            key={item.href}
            shadow="sm"
            p="xl"
            radius="md"
            withBorder
            component={Link}
            href={item.href}
            style={{ textDecoration: 'none' }}
          >
            <Group>
              <item.icon size={32} color={`var(--mantine-color-${item.color}-6)`} />
              <div>
                <Title order={3} c={item.color}>{item.title}</Title>
                <Text c="dimmed" size="sm">{item.description}</Text>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Frequently Asked Questions</Title>
          <Stack gap="xs">
            <div>
              <Text fw={500}>What's your address?</Text>
              <Text size="sm">272 Strines Road, Marple, SK6 7GB</Text>
            </div>
          </Stack>
        </Stack>
      </Card>

      <Card withBorder>
        <Text>
          Navigate using the menu or the cards above to view gift lists and schedule information.
        </Text>
      </Card>
    </Stack>
  );
}
