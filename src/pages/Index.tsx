
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/dashboard/StatCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import QuickActions from '../components/dashboard/QuickActions';
import { Users, FileText, Calendar, Mail, Plus, Upload, Edit } from 'lucide-react';

const Index = () => {
  const stats = [
    { title: 'Total Users', value: '3,456', icon: <Users size={20} />, change: { value: '12%', positive: true } },
    { title: 'Documents', value: '1,234', icon: <FileText size={20} />, change: { value: '5%', positive: true } },
    { title: 'Events', value: '42', icon: <Calendar size={20} />, change: { value: '3%', positive: false } },
    { title: 'Messages', value: '89', icon: <Mail size={20} />, change: { value: '18%', positive: true } },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'created a new document', target: 'Project Proposal', time: '5 minutes ago' },
    { user: 'Jane Smith', action: 'commented on', target: 'Sales Report', time: '1 hour ago' },
    { user: 'Robert Johnson', action: 'uploaded', target: 'Q2 Financial Statement', time: '2 hours ago' },
    { user: 'Emily Davis', action: 'assigned', target: 'Bug Fix #123 to Alice', time: '3 hours ago' },
    { user: 'Michael Brown', action: 'completed task', target: 'Client Meeting Preparation', time: '1 day ago' },
  ];

  const quickActions = [
    { title: 'New Document', icon: <Plus size={18} /> },
    { title: 'Upload Files', icon: <Upload size={18} /> },
    { title: 'Edit Profile', icon: <Edit size={18} /> },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your workspace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityCard activities={recentActivities} />
        </div>
        <div>
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
