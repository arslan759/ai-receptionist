'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: number;
  clientName: string;
  date: string;
  question: string;
  status: 'open' | 'resolved';
  response?: string;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    clientName: 'John Smith',
    date: '2024-03-20',
    question:
      'Can you explain how the new tax law changes affect my business deductions?',
    status: 'open',
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    date: '2024-03-19',
    question: 'When is the deadline for filing my quarterly taxes?',
    status: 'open',
  },
  // Add more sample data as needed
];

export default function OpenQuestions() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [response, setResponse] = useState('');

  const handleSubmitResponse = () => {
    if (selectedQuestion && response) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === selectedQuestion.id
            ? { ...q, status: 'resolved', response }
            : q
        )
      );
      setSelectedQuestion(null);
      setResponse('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Open Questions</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{question.clientName}</CardTitle>
                  <CardDescription>{question.date}</CardDescription>
                </div>
                <Badge variant={question.status === 'resolved' ? 'default' : 'secondary'}>
                  {question.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{question.question}</p>
              {question.response ? (
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium mb-1">Response:</p>
                  <p className="text-sm">{question.response}</p>
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => setSelectedQuestion(question)}
                >
                  Respond
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedQuestion}
        onOpenChange={() => setSelectedQuestion(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Respond to Question</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              Question from {selectedQuestion?.clientName}
            </h3>
            <p className="text-sm mb-4">{selectedQuestion?.question}</p>
            <Textarea
              placeholder="Type your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmitResponse}>Submit Response</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}