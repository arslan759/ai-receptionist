"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import GoogleSignInButton from "@/components/google-signin";

export default function Appointments() {
  const [title, setTitle] = useState("");
  const [attendee, setAttendee] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  const { data: session, status } = useSession();

  const fetchEvents = async () => {
    if (!session) return;

    const res = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`, // Use the user's access token
        },
      }
    );

    const data = await res.json();

    setEvents(data.items);
  };

  const addEvent = async () => {
    if (!session) return;

    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: date?.toISOString(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: date?.toISOString(),
        timeZone: "America/New_York",
      },
      attendees: [{ email: attendee }],
    };

    const res = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (res.ok) {
      setIsNewAppointmentOpen(false);
      fetchEvents();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Appointments</h1>

        <GoogleSignInButton />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <Button onClick={fetchEvents} className="mb-4">
            Load Google Calendar Events
          </Button>
          <div className="space-y-4">
            {events.map((event: any) => (
              <div key={event.id} className="p-4 rounded-lg border">
                <h3 className="font-semibold">{event.summary}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.start.dateTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={isNewAppointmentOpen}
        onOpenChange={setIsNewAppointmentOpen}
      >
        <DialogTrigger asChild>
          <Button>New Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Title</Label>
              <Input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Attendee</Label>
              <Input
                id="attendee"
                type="text"
                onChange={(e) => setAttendee(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={addEvent}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
