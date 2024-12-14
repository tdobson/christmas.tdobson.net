import { Title, Stack, Card, Text, Timeline, List } from '@mantine/core';
import { IconCalendar, IconUsers, IconMusic, IconStar, IconBell } from '@tabler/icons-react';

export default function SchedulePage() {
  // Add color constants for consistency
  const colors = {
    calendar: '#228BE6',   // blue
    music: '#BE4BDB',      // grape
    users: '#40C057',      // green
    star: '#FCC419',       // yellow
    food: '#FF6B6B',       // red
    church: '#7950F2',     // violet
    gift: '#20C997'        // teal
  };

  return (
    <Stack gap="md">
      <Title order={1}>🎄 Schedule</Title>

      <Card withBorder>
        <Timeline active={-1} bulletSize={32} color="blue">
          <Timeline.Item
            bullet={<IconCalendar size={16} color={colors.calendar} />}
            title="Saturday 21st December"
          >
            <Stack gap="xs">
              <Text size="sm" fw={500}>Morning</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Hosting stay and play at Strines Road (09:30-12:00)</List.Item>
                <List.Item>Christmas Sainsbury's delivery expected</List.Item>
              </List>
              
              <Text size="sm" fw={500}>Evening (18:00-22:00)</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Family visiting</List.Item>
              </List>
            </Stack>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCalendar size={12} color={colors.calendar} />}
            title="Sunday 22nd December"
          >
            <Text size="sm">Visiting Judith and Adrian</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCalendar size={12} color={colors.calendar} />}
            title="Monday 23rd December"
          >
            <Text size="sm">James at nursery (maintaining routine)</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCalendar size={16} color={colors.calendar} />}
            title="Tuesday 24th December - Arrival Day"
          >
            <Stack gap="xs">
              <Text size="sm" fw={500}>Afternoon</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Tony and Liz to check into hotel first</List.Item>
                <List.Item>Afternoon tea service with cake and sandwiches</List.Item>
              </List>
              
              <Text size="sm" fw={500}>Evening - Old Cross Visit (6:00pm - 7:00pm)</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Taking two cars for easier transfers</List.Item>
                <List.Item>James to have pasta meal during visit</List.Item>
                <List.Item>Mulled wine and mince pies served (interval 6:20pm - 6:35pm)</List.Item>
              </List>

              <Text size="sm" fw={500}>Evening Meal</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Pre-prepared flan</List.Item>
                <List.Item>Potatoes</List.Item>
                <List.Item>All cooking done in advance</List.Item>
              </List>
            </Stack>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconUsers size={16} color={colors.users} />}
            title="Wednesday 25th December - Christmas Day"
          >
            <Stack gap="xs">
              <Text size="sm" fw={500}>Church Options</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Tony and Liz might go to church in Strines or Marple Bridge</List.Item>
              </List>

              <Text size="sm" fw={500}>Morning</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Tony and Liz having breakfast at hotel</List.Item>
              </List>

              <Text size="sm" fw={500}>Main Meal</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Non-traditional Christmas lunch (possibly pie)</List.Item>
              </List>

              <Text size="sm" fw={500}>Afternoon Activities</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Potential walk in New Mills on the Millennium Walkway</List.Item>
              </List>

              <Text size="sm" fw={500}>Present Opening</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Main present opening session for James</List.Item>
                <List.Item>Some presents saved for Boxing Day with Sarah and Chris</List.Item>
                <List.Item>Remaining James's presents to be spread across several days</List.Item>
              </List>
            </Stack>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconUsers size={16} color={colors.users} />}
            title="Thursday 26th December - Boxing Day"
          >
            <Stack gap="xs">
              <Text size="sm" fw={500}>Morning</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Tony and Liz having breakfast at hotel</List.Item>
              </List>

              <Text size="sm" fw={500}>Early Afternoon (2:00pm - 4:00pm)</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Sarah and Chris arriving from York</List.Item>
                <List.Item>Main present opening session with everyone</List.Item>
                <List.Item>Afternoon nibbles provided</List.Item>
              </List>

              <Text size="sm" fw={500}>Evening (5:30pm)</Text>
              <List size="sm" spacing="xs" withPadding>
                <List.Item>Traditional Christmas dinner</List.Item>
                <List.Item>Present opening coordinated with Sarah's arrival</List.Item>
              </List>
              
              <Text size="sm" c="dimmed">Sarah and Chris staying overnight (living room floor/sofa)</Text>
            </Stack>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCalendar size={12} color={colors.calendar} />}
            title="Friday 27th December"
          >
            <Text size="sm">Jen's parents depart Strines</Text>
            <Text size="sm" c="dimmed">Available for Tim's family and other visitors from lunchtime onwards</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCalendar size={12} color={colors.calendar} />}
            title="Saturday 28th-Monday 30th December"
          >
            <Text size="sm">Available all day Saturday 28th for visitors</Text>
            <Text size="sm" c="dimmed">Sunday 29th-Monday 30th - additional potential visit windows</Text>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>We want to see you!</Title>
          <List
            spacing="xs"
            size="sm"
            center
            icon={<IconStar size="1rem" style={{ color: colors.star }} />}
          >
            <List.Item>We prefer smaller family groups to help James connect and keep things calm</List.Item>
            <List.Item>We understand schedules might be tricky - we'll do our best to make things work</List.Item>
            <List.Item>Happy to host or visit - let us know your preference</List.Item>
          </List>
        </Stack>
      </Card>
    </Stack>
  );
}
