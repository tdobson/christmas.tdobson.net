import React from 'react';
import { Title, Stack, Card, Text, Accordion } from '@mantine/core';
import faqData from '../config/faq.json' assert { type: "json" };

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

export function FAQ() {
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
    return (
      <Stack gap={4}>
        {question.answer.split('\n').map((line, index) => (
          <Text size="sm" key={index}>
            {line}
          </Text>
        ))}
      </Stack>
    );
  };

  return (
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
  );
}
