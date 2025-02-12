'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Phone, Calendar, FileText, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  phoneSystemEnabled: z.boolean(),
  phoneSystemApiKey: z.string().min(1, 'API key is required').optional(),
  phoneSystemWebhook: z.string().url('Must be a valid URL').optional(),
  
  calendarEnabled: z.boolean(),
  calendarApiKey: z.string().min(1, 'API key is required').optional(),
  calendarClientId: z.string().min(1, 'Client ID is required').optional(),
  
  documentEnabled: z.boolean(),
  documentApiKey: z.string().min(1, 'API key is required').optional(),
  documentBucket: z.string().min(1, 'Bucket name is required').optional(),
  
  emailEnabled: z.boolean(),
  emailApiKey: z.string().min(1, 'API key is required').optional(),
  emailFromAddress: z.string().email('Must be a valid email').optional(),
});

type FormData = z.infer<typeof formSchema>;

const integrations = [
  {
    id: 'phone',
    title: 'Phone System Integration',
    description: 'Configure your VoIP system integration for call handling',
    icon: Phone,
    enableField: 'phoneSystemEnabled',
    fields: [
      {
        name: 'phoneSystemApiKey',
        label: 'API Key',
        description: 'Your phone system API key for authentication',
        type: 'password',
      },
      {
        name: 'phoneSystemWebhook',
        label: 'Webhook URL',
        description: 'Endpoint for receiving phone system events',
        type: 'url',
      },
    ],
  },
  {
    id: 'calendar',
    title: 'Calendar Integration',
    description: 'Connect your calendar for appointment management',
    icon: Calendar,
    enableField: 'calendarEnabled',
    fields: [
      {
        name: 'calendarApiKey',
        label: 'API Key',
        description: 'Your calendar service API key',
        type: 'password',
      },
      {
        name: 'calendarClientId',
        label: 'Client ID',
        description: 'OAuth client ID for calendar access',
        type: 'text',
      },
    ],
  },
  {
    id: 'document',
    title: 'Document Management',
    description: 'Configure document storage and processing',
    icon: FileText,
    enableField: 'documentEnabled',
    fields: [
      {
        name: 'documentApiKey',
        label: 'API Key',
        description: 'Your document storage API key',
        type: 'password',
      },
      {
        name: 'documentBucket',
        label: 'Storage Bucket',
        description: 'Name of your document storage bucket',
        type: 'text',
      },
    ],
  },
  {
    id: 'email',
    title: 'Email Notifications',
    description: 'Set up email notification settings',
    icon: Mail,
    enableField: 'emailEnabled',
    fields: [
      {
        name: 'emailApiKey',
        label: 'SMTP Key',
        description: 'Your email service API key',
        type: 'password',
      },
      {
        name: 'emailFromAddress',
        label: 'From Address',
        description: 'Default sender email address',
        type: 'email',
      },
    ],
  },
];

export default function Settings() {
  const [isTestingConnection, setIsTestingConnection] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneSystemEnabled: false,
      calendarEnabled: false,
      documentEnabled: false,
      emailEnabled: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: 'Settings saved',
        description: 'Your integration settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const testConnection = async (integrationId: string) => {
    setIsTestingConnection(integrationId);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: 'Connection successful',
        description: `Successfully connected to ${integrationId} service.`,
      });
    } catch (error) {
      toast({
        title: 'Connection failed',
        description: `Failed to connect to ${integrationId} service. Please check your credentials.`,
        variant: 'destructive',
      });
    } finally {
      setIsTestingConnection(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your AI receptionist integrations and preferences
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <integration.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{integration.title}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div>
                                <FormField
                                  control={form.control}
                                  name={integration.enableField}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {form.getValues(integration.enableField)
                                    ? 'Disable Integration'
                                    : 'Enable Integration'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {form.getValues(integration.enableField)
                                    ? 'This will disconnect the integration and stop all related functionality. Are you sure?'
                                    : 'This will enable the integration and allow the system to interact with the service. Continue?'}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    form.setValue(
                                      integration.enableField,
                                      !form.getValues(integration.enableField)
                                    )
                                  }
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {form.getValues(integration.enableField)
                              ? 'Disable integration'
                              : 'Enable integration'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {form.getValues(integration.enableField) &&
                      integration.fields.map((field) => (
                        <FormField
                          key={field.name}
                          control={form.control}
                          name={field.name as keyof FormData}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{field.label}</FormLabel>
                              <FormControl>
                                <Input
                                  type={field.type}
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                  {...formField}
                                />
                              </FormControl>
                              <FormDescription>{field.description}</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    {form.getValues(integration.enableField) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => testConnection(integration.id)}
                        disabled={isTestingConnection === integration.id}
                      >
                        {isTestingConnection === integration.id
                          ? 'Testing...'
                          : 'Test Connection'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}