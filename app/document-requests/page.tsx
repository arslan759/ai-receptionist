'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';

type Status = 'pending' | 'completed';

interface DocumentRequest {
  id: number;
  clientName: string;
  documentType: string;
  requestDate: string;
  dueDate: string;
  status: Status;
  description: string;
}

const initialRequests: DocumentRequest[] = [
  {
    id: 1,
    clientName: 'John Smith',
    documentType: 'Tax Returns',
    requestDate: '2024-03-15',
    dueDate: '2024-03-30',
    status: 'pending',
    description: 'Last 3 years of personal tax returns needed for audit.',
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    documentType: 'Bank Statements',
    requestDate: '2024-03-18',
    dueDate: '2024-03-25',
    status: 'pending',
    description: 'Business account statements for Q1 2024.',
  },
  // Add more sample data as needed
];

export default function DocumentRequests() {
  const [requests, setRequests] = useState<DocumentRequest[]>(initialRequests);

  const handleMarkComplete = (id: number) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: 'completed' as Status }
          : request
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Document Requests</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{request.documentType}</CardTitle>
                  <CardDescription>{request.clientName}</CardDescription>
                </div>
                <Badge
                  variant={request.status === 'completed' ? 'default' : 'secondary'}
                >
                  {request.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <Clock className="h-4 w-4 mr-1" />
                  )}
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {request.description}
              </p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Requested:</span>
                  <span>{request.requestDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due:</span>
                  <span>{request.dueDate}</span>
                </div>
              </div>
              {request.status === 'pending' && (
                <Button
                  className="w-full mt-4"
                  onClick={() => handleMarkComplete(request.id)}
                >
                  Mark as Complete
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}