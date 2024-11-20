import { Title, Stack, Card, Text, Timeline, List } from '@mantine/core';
import { IconCalendar, IconUsers, IconMusic, IconStar, IconBell } from '@tabler/icons-react';

export default function SchedulePage() {
  // Add color constants for consistency
  const colors = {
    calendar: '#228BE6', // blue
    music: '#BE4BDB',    // grape
    users: '#40C057',    // green
    star: '#FCC419',     // yellow
  };

  return (
    <Stack gap="md">
      <Title order={1}>Christmas 2024 Schedule</Title>

      <Card withBorder>
        <Timeline active={-1} bulletSize={24} color="blue">
          <Timeline.Item 
            bullet={<IconCalendar size={12} color={colors.calendar} />} 
            title="December 21"
          >
            <Text size="sm">Potential visit window for Tim's family</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} color={colors.calendar} />} 
            title="December 22"
          >
            <Text size="sm">Visiting Judith and Adrian</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} color={colors.calendar} />} 
            title="December 23"
          >
            <Text size="sm">James at nursery (maintaining routine)</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconMusic size={12} color={colors.music} />} 
            title="December 24 Evening"
          >
            <Text size="sm">Carols event in Old Glossop</Text>
            <Text size="sm" c="dimmed">Jen's parents arrive (staying at nearby Airbnb)</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconUsers size={12} color={colors.users} />} 
            title="December 25"
          >
            <Text size="sm">Christmas Day with Jen's parents</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconUsers size={12} color={colors.users} />} 
            title="December 26"
          >
            <Text size="sm">Boxing Day</Text>
            <Text size="sm" c="dimmed">Sarah and Chris joining for dinner</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} color={colors.calendar} />} 
            title="December 27"
          >
            <Text size="sm">Jen's parents depart</Text>
            <Text size="sm" c="dimmed">Potential afternoon visit window for Tim's family</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} color={colors.calendar} />} 
            title="December 28-30"
          >
            <Text size="sm">Additional potential visit windows for Tim's family</Text>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Important Notes</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconStar size="1rem" style={{ color: colors.star }} />}
          >
            <List.Item>Keeping gatherings smaller this year for James's comfort</List.Item>
            <List.Item>Focusing on quality time in smaller groups</List.Item>
            <List.Item>Maintaining James's routine where possible</List.Item>
          </List>
        </Stack>
      </Card>
    </Stack>
  );
}
