import { Title, Stack, Card, Text, Timeline } from '@mantine/core';
import { IconGift, IconCookie, IconTree } from '@tabler/icons-react';

export default function SchedulePage() {
  return (
    <Stack gap="md">
      <Title order={1}>Christmas 2024 Schedule</Title>

      <Card withBorder>
        <Timeline active={1} bulletSize={24}>
          <Timeline.Item bullet={<IconTree size={12} />} title="Tree Decorating">
            <Text size="sm">December 1st, 2024</Text>
            <Text size="sm" c="dimmed">
              Family tree decorating party at Grandma's house
            </Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconCookie size={12} />} title="Cookie Exchange">
            <Text size="sm">December 15th, 2024</Text>
            <Text size="sm" c="dimmed">
              Annual family cookie baking and exchange
            </Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconGift size={12} />} title="Gift Exchange">
            <Text size="sm">December 25th, 2024</Text>
            <Text size="sm" c="dimmed">
              Christmas morning celebration and gift exchange
            </Text>
          </Timeline.Item>
        </Timeline>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Additional Notes</Title>
          <Text>Please RSVP for each event at least one week in advance.</Text>
          <Text>Bring a dish to share for Christmas day celebration.</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
