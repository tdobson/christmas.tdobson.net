import React from 'react';
import { Title, Stack, Card, Text, Timeline, List } from '@mantine/core';
import { FAQ } from '../components/FAQ';
import { IconCalendar, IconUsers, IconStar } from '@tabler/icons-react';
import scheduleData from '../config/schedule.json';

export default function SchedulePage() {
  const colors = {
    calendar: '#228BE6',   // blue
    users: '#40C057',      // green
    star: '#FCC419',       // yellow
  };

  const getIcon = (iconName: string, size: number) => {
    const iconProps = { size, color: colors[iconName as keyof typeof colors] };
    switch (iconName) {
      case 'users':
        return <IconUsers {...iconProps} />;
      case 'calendar':
      default:
        return <IconCalendar {...iconProps} />;
    }
  };

  return (
    <Stack gap="md">
      <Title order={1}>🎄 Schedule</Title>

      <Card withBorder>
        <Timeline active={-1} bulletSize={24} color="blue">
          {scheduleData.events.map((event, index) => (
            <Timeline.Item
              key={index}
              bullet={getIcon(event.icon, 20)}
              title={event.date}
            >
              {event.description && (
                <Text size="sm">{event.description}</Text>
              )}
              
              {event.sections && (
                <Stack gap="xs">
                  {event.sections.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      <Text size="sm" fw={500}>{section.title}</Text>
                      <List size="sm" spacing="xs" withPadding>
                        {section.items.map((item, itemIndex) => (
                          <List.Item key={itemIndex}>{item}</List.Item>
                        ))}
                      </List>
                    </React.Fragment>
                  ))}
                </Stack>
              )}
              
              {event.note && (
                <Text size="sm" c="dimmed">{event.note}</Text>
              )}
            </Timeline.Item>
          ))}
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
            {scheduleData.visitingNotes.map((note, index) => (
              <List.Item key={index}>{note}</List.Item>
            ))}
          </List>
        </Stack>
      </Card>
      <FAQ />
    </Stack>
  );
}
