import React from 'react';
import { Title, Text, Stack, Paper, Group, SimpleGrid } from '@mantine/core';
import { IconGift, IconCalendar } from '@tabler/icons-react';
import Link from 'next/link';
import { FAQ } from '../components/FAQ';

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
      title: "Jen's List",
      description: "Gift ideas for Jen",
      href: "/jen-list",
      icon: IconGift,
      color: "grape",

    },    {
      title: "Tim's List",
      description: "Gift ideas for Tim",
      href: "/tim-list",
      icon: IconGift,
      color: "green",
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
      <Text>We're using this site to coordinate Christmas gifts and schedules.</Text>

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

      <FAQ />

    </Stack>
  );
}
