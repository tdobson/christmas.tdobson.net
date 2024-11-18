import { Title, List, Stack, Card, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function JamesListPage() {
  const priorityItems = [
    'Teeny weenie balance bike (smallest available size - currently size 3.5 feet)',
    'Thicker foam/rubber play mat for safety under climbing areas',
    'Kids\' food preparation knives',
    'Animal posters for his room (especially dogs)',
    'Number floor tiles/mats'
  ];

  const otherItems = [
    'Warm boots (size 4-4.5)',
    'Climbing harness (Edelrid model)',
    'Small buoyancy aid for swimming',
    'Orange(s) for Christmas stocking',
    'Flyaway footballs'
  ];

  const doNotBuy = [
    'Clothes (except specified boots)',
    'Coats',
    'Wellies',
    'Books',
    'Media',
    'Dummies',
    'Duplo/Lego (have plenty)',
    'Chocolate/sweets'
  ];

  return (
    <Stack gap="md">
      <Title order={1}>James's Christmas List</Title>

      <Alert icon={<IconAlertCircle size="1rem" />} title="Important Note" color="red">
        Please check with parents before purchasing to avoid duplicates
      </Alert>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Priority Items</Title>
          <List>
            {priorityItems.map((item) => (
              <List.Item key={item}>{item}</List.Item>
            ))}
          </List>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Other Items</Title>
          <List>
            {otherItems.map((item) => (
              <List.Item key={item}>{item}</List.Item>
            ))}
          </List>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2} c="red">Please Do Not Buy</Title>
          <List>
            {doNotBuy.map((item) => (
              <List.Item key={item}>{item}</List.Item>
            ))}
          </List>
        </Stack>
      </Card>
    </Stack>
  );
}
