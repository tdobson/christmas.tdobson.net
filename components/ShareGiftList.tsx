import { Card, Text, Group, Button, Stack } from '@mantine/core';
import { IconMail, IconBrandMessenger } from '@tabler/icons-react';

export function ShareGiftList() {
  return (
    <Card withBorder shadow="sm" p="lg">
      <Stack gap="md">
        <Text size="lg" fw={500}>
          Do you have gift ideas for *you* to share? 🎁
        </Text>
        <Text size="sm" c="dimmed">
          We'd love to see your gift list! It helps us if we're suffering from imagination failure.
          Get in touch with us:
        </Text>
        <Group>
          <Button
            component="a"
            href="mailto:timandjen@tdobson.net"
            leftSection={<IconMail size="1rem" />}
            variant="light"
            color="blue"
          >
            Email us
          </Button>
          <Button
            component="a"
            href="https://m.me/tdobson"
            target="_blank"
            rel="noopener noreferrer"
            leftSection={<IconBrandMessenger size="1rem" />}
            variant="light"
            color="indigo"
          >
            Message us
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
