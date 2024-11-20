import { Title, Text, Stack, Card, Paper, Group, SimpleGrid, Accordion } from '@mantine/core';
import { IconGift, IconCalendar } from '@tabler/icons-react';
import Link from 'next/link';
import faqData from '../config/faq.json';

interface Answer {
  person: string;
  requirements: string;
}

interface BaseQuestion {
  question: string;
}

interface SimpleQuestion extends BaseQuestion {
  answer: string;
}

interface ComplexQuestion extends BaseQuestion {
  answers: Answer[];
}

type Question = SimpleQuestion | ComplexQuestion;

export default function HomePage() {
  const renderAnswer = (question: Question) => {
    if ('answers' in question) {
      return (
        <Stack gap={4}>
          {question.answers.map((answer) => (
            <Text size="sm" key={answer.person}>
              <strong>{answer.person}:</strong> {answer.requirements}
            </Text>
          ))}
        </Stack>
      );
    }
    return <Text size="sm">{question.answer}</Text>;
  };
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

      <Card withBorder>
        <Stack gap="sm">
          <Title order={2}>Q&A</Title>
          <Accordion>
            {faqData.questions.map((question, index) => (
              <Accordion.Item key={index} value={`question-${index}`}>
                <Accordion.Control>
                  <Text fw={500}>{question.question}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  {renderAnswer(question)}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
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
