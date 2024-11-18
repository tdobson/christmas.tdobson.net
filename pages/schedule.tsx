import { Title, Stack, Card, Text, Timeline } from '@mantine/core';
import { IconCalendar, IconUsers, IconMusic } from '@tabler/icons-react';

export default function SchedulePage() {
  return (
    <Stack gap="md">
      <Title order={1}>Christmas 2024 Schedule</Title>

      <Card withBorder>
        <Timeline active={-1} bulletSize={24}>
          <Timeline.Item 
            bullet={<IconCalendar size={12} />} 
            title="December 21-22"
          >
            <Text size="sm">Potential visit window for Tim's family</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} />} 
            title="December 23"
          >
            <Text size="sm">James at nursery (maintaining routine)</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconMusic size={12} />} 
            title="December 24 Evening"
          >
            <Text size="sm">Carols event in Old Glossop</Text>
            <Text size="sm" c="dimmed">Jen's parents arrive (staying at nearby Airbnb)</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconUsers size={12} />} 
            title="December 25"
          >
            <Text size="sm">Christmas Day with Jen's parents</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconUsers size={12} />} 
            title="December 26"
          >
            <Text size="sm">Boxing Day</Text>
            <Text size="sm" c="dimmed">Sarah and Chris joining for dinner</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} />} 
            title="December 27"
          >
            <Text size="sm">Jen's parents depart</Text>
            <Text size="sm" c="dimmed">Potential afternoon visit window for Tim's family</Text>
          </Timeline.Item>

          <Timeline.Item 
            bullet={<IconCalendar size={12} />} 
            title="December 28-30"
          >
            <Text size="sm">Additional potential visit windows for Tim's family</Text>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Important Notes</Title>
          <Text>• Keeping gatherings smaller this year for James's comfort</Text>
          <Text>• Focusing on quality time in smaller groups</Text>
          <Text>• Maintaining James's routine where possible</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
