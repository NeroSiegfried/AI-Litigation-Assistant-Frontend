import { Bell, FileText, Scale, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Active Matters', value: '24', icon: Briefcase, color: 'text-blue-600', change: '+3' },
    { label: 'Due This Week', value: '8', icon: Clock, color: 'text-orange-600', change: '2 urgent' },
    { label: 'CauseList Alerts', value: '3', icon: Bell, color: 'text-red-600', change: 'New' },
    { label: 'Documents Reviewed', value: '1,247', icon: FileText, color: 'text-green-600', change: '+124' },
  ];

  const recentMatters = [
    {
      id: '1',
      title: 'Tan Sri Lim v. ABC Corporation',
      caseNo: 'WA-22NCVC-145/2024',
      court: 'High Court Kuala Lumpur',
      nextHearing: '2024-11-05',
      status: 'trial-prep',
      progress: 65,
    },
    {
      id: '2',
      title: 'XYZ Sdn Bhd v. State Government',
      caseNo: 'JR-14NCC-278/2023',
      court: 'High Court Ipoh',
      nextHearing: '2024-11-12',
      status: 'discovery',
      progress: 40,
    },
    {
      id: '3',
      title: 'Director General of Immigration v. Ramesh Kumar',
      caseNo: 'CA-01(A)-89/2024',
      court: 'Court of Appeal Putrajaya',
      nextHearing: '2024-12-01',
      status: 'appeal',
      progress: 80,
    },
  ];

  const upcomingDeadlines = [
    { task: 'File Defence in Lim v. ABC Corp', date: '2024-11-08', matter: 'WA-22NCVC-145/2024', urgent: true },
    { task: 'Submit Bundle of Authorities', date: '2024-11-15', matter: 'JR-14NCC-278/2023', urgent: true },
    { task: 'Affidavit of Evidence in Chief', date: '2024-11-20', matter: 'WA-22NCVC-145/2024', urgent: false },
    { task: 'Case Management Notes', date: '2024-11-25', matter: 'CA-01(A)-89/2024', urgent: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trial-prep': return 'bg-orange-100 text-orange-800';
      case 'discovery': return 'bg-blue-100 text-blue-800';
      case 'appeal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'trial-prep': return 'Trial Prep';
      case 'discovery': return 'Discovery';
      case 'appeal': return 'Appeal';
      default: return status;
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome back, Ahmad. Here's your litigation overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button onClick={() => onNavigate({ type: 'matters' })} className="gap-2">
            <FileText className="h-4 w-4" />
            New Matter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className={`text-2xl mt-2 ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Calendar Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>This Week's Schedule</CardTitle>
              <CardDescription>Upcoming hearings and deadlines</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate({ type: 'calendar' })}>
              View Full Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50">
              <div className="flex flex-col items-center w-12">
                <span className="text-xl text-blue-600">5</span>
                <span className="text-xs text-slate-600">Nov</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">Case Management</p>
                <p className="text-xs text-slate-600">WA-22NCVC-145/2024 • 09:00 AM</p>
              </div>
              <Badge className="bg-blue-600 text-white">Hearing</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50">
              <div className="flex flex-col items-center w-12">
                <span className="text-xl text-red-600">8</span>
                <span className="text-xs text-slate-600">Nov</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">File Defence</p>
                <p className="text-xs text-slate-600">WA-22NCVC-145/2024</p>
              </div>
              <Badge className="bg-red-600 text-white">Deadline</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50">
              <div className="flex flex-col items-center w-12">
                <span className="text-xl text-blue-600">12</span>
                <span className="text-xs text-slate-600">Nov</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">Judicial Review Hearing</p>
                <p className="text-xs text-slate-600">JR-14NCC-278/2023 • 02:30 PM</p>
              </div>
              <Badge className="bg-blue-600 text-white">Hearing</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Matters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Matters</CardTitle>
            <CardDescription>Your most active cases requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMatters.map((matter) => (
              <div key={matter.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => onNavigate({ type: 'matter', matterId: matter.id })}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                    >
                      {matter.title}
                    </button>
                    <p className="text-sm text-slate-600">{matter.caseNo}</p>
                  </div>
                  <Badge className={getStatusColor(matter.status)}>
                    {getStatusLabel(matter.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Scale className="h-3 w-3" />
                    {matter.court}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Next: {matter.nextHearing}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Progress</span>
                    <span>{matter.progress}%</span>
                  </div>
                  <Progress value={matter.progress} className="h-2" />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate({ type: 'matters' })}
            >
              View All Matters
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="border-l-2 border-slate-300 pl-3 py-1">
                <div className="flex items-start gap-2">
                  {deadline.urgent && <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{deadline.task}</p>
                    <p className="text-xs text-slate-600 mt-1">{deadline.matter}</p>
                    <p className={`text-xs mt-1 ${deadline.urgent ? 'text-red-600' : 'text-slate-500'}`}>
                      Due: {deadline.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Missing Briefcase import
import { Briefcase } from 'lucide-react';
