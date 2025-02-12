import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, FileText, HelpCircle } from 'lucide-react';

const stats = [
  {
    name: 'Total Calls',
    value: '245',
    icon: Phone,
    description: 'Last 30 days',
  },
  {
    name: 'Appointments',
    value: '42',
    icon: Calendar,
    description: 'Upcoming',
  },
  {
    name: 'Document Requests',
    value: '18',
    icon: FileText,
    description: 'Pending',
  },
  {
    name: 'Open Questions',
    value: '7',
    icon: HelpCircle,
    description: 'Awaiting response',
  },
];

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}