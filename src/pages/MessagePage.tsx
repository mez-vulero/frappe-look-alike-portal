import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockLogs = [
  { id: 1, type: 'Push', message: 'Welcome!', receivers: 'Students', date: '2024-06-01', status: 'Sent' },
  { id: 2, type: 'SMS', message: 'Subscription expiring soon', receivers: 'Parents', date: '2024-06-02', status: 'Sent' },
];

const MessagePage: React.FC = () => {
  // Form state
  const [messageType, setMessageType] = useState('push');
  const [userType, setUserType] = useState('student');
  const [subscriptionType, setSubscriptionType] = useState('all');
  const [gender, setGender] = useState('all');
  const [message, setMessage] = useState('');

  // Log filter state
  const [logType, setLogType] = useState('all');
  const [logUserType, setLogUserType] = useState('all');

  // Handlers
  const handleSend = () => {
    // Implement send logic here
    alert('Message sent!');
  };

  return (
    <MainLayout>
      <div className="container mx-auto space-y-8 py-6">
        {/* Section 1: Send Notification */}
        <Card className="border-none frappe-shadow">
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>Create and send push or SMS notifications to users with advanced filtering.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Message Type</label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">User Type</label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="institution">Institution</SelectItem>
                      <SelectItem value="gd_employee">GD Employee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Subscription Type</label>
                  <Select value={subscriptionType} onValueChange={setSubscriptionType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Gender</label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Message</label>
                  <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message here..." />
                </div>
                <div className="flex items-end justify-end">
                  <Button type="button" onClick={handleSend} className="w-full md:w-auto">Send</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Section 2: Message Logs */}
        <Card className="border-none frappe-shadow">
          <CardHeader>
            <CardTitle>Message Logs</CardTitle>
            <CardDescription>View logs of sent messages and filter by type or user group.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-48">
                <Select value={logType} onValueChange={setLogType}>
                  <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={logUserType} onValueChange={setLogUserType}>
                  <SelectTrigger><SelectValue placeholder="All User Types" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All User Types</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="institution">Institution</SelectItem>
                    <SelectItem value="gd_employee">GD Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Receivers</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogs
                  .filter(log => (logType === 'all' || log.type.toLowerCase() === logType))
                  .filter(log => (logUserType === 'all' || log.receivers.toLowerCase() === logUserType))
                  .map(log => (
                    <TableRow key={log.id}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.type}</TableCell>
                      <TableCell>{log.receivers}</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>{log.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MessagePage; 