'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const callLogs = [
  {
    id: 1,
    date: '2024-03-20',
    time: '09:30 AM',
    clientName: 'John Smith',
    duration: '5:23',
    transcription:
      'Discussion about quarterly tax filing and documentation requirements...',
  },
  {
    id: 2,
    date: '2024-03-20',
    time: '10:15 AM',
    clientName: 'Sarah Johnson',
    duration: '3:45',
    transcription: 'Inquiry about business expense categorization...',
  },
  // Add more sample data as needed
];

export default function CallLogs() {
  const [selectedCall, setSelectedCall] = useState<typeof callLogs[0] | null>(
    null
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Call Logs</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.map((call) => (
              <TableRow key={call.id}>
                <TableCell>{call.date}</TableCell>
                <TableCell>{call.time}</TableCell>
                <TableCell>{call.clientName}</TableCell>
                <TableCell>{call.duration}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCall(call)}
                  >
                    View Transcription
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Transcription</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              Call with {selectedCall?.clientName}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedCall?.date} at {selectedCall?.time} ({selectedCall?.duration}
              )
            </p>
            <p className="text-sm">{selectedCall?.transcription}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}