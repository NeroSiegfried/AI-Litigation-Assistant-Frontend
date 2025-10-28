import { useState } from 'react';
import { Bell, Calendar, Search, AlertCircle, Download, ExternalLink, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Page } from '../App';

interface CauseListMonitoringProps {
  onNavigate: (page: Page) => void;
}

export function CauseListMonitoring({ onNavigate }: CauseListMonitoringProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourt, setFilterCourt] = useState('all');

  const upcomingHearings = [
    {
      id: '1',
      matterId: '1',
      caseNo: 'WA-22NCVC-145/2024',
      caseTitle: 'Tan Sri Lim v. ABC Corporation',
      court: 'High Court Kuala Lumpur',
      courtroom: 'Court 5.2',
      date: '2024-11-05',
      time: '09:00 AM',
      type: 'Case Management',
      judge: 'YA Dato\' Sri Ahmad bin Abdullah',
      status: 'confirmed',
      lastChecked: '2024-10-28 08:00',
      changed: false,
    },
    {
      id: '2',
      matterId: '2',
      caseNo: 'JR-14NCC-278/2023',
      caseTitle: 'XYZ Sdn Bhd v. State Government',
      court: 'High Court Ipoh',
      courtroom: 'Court 3.1',
      date: '2024-11-12',
      time: '02:30 PM',
      type: 'Hearing (Judicial Review)',
      judge: 'YA Puan Hakim Faridah binti Yusof',
      status: 'confirmed',
      lastChecked: '2024-10-28 08:00',
      changed: false,
    },
    {
      id: '3',
      matterId: '3',
      caseNo: 'CA-01(A)-89/2024',
      caseTitle: 'Director General of Immigration v. Ramesh Kumar',
      court: 'Court of Appeal Putrajaya',
      courtroom: 'Court 1',
      date: '2024-12-01',
      time: '10:00 AM',
      type: 'Appeal Hearing',
      judge: 'Panel of 3 Judges',
      status: 'tentative',
      lastChecked: '2024-10-28 08:00',
      changed: false,
    },
  ];

  const recentChanges = [
    {
      id: '1',
      caseNo: 'WA-22NCVC-167/2024',
      caseTitle: 'Marina Development v. Construction Co',
      court: 'High Court Shah Alam',
      changeType: 'date-change',
      oldValue: '2024-11-08',
      newValue: '2024-11-15',
      detectedAt: '2024-10-28 07:30',
    },
    {
      id: '2',
      caseNo: 'WA-22NCVC-189/2024',
      caseTitle: 'Tech Innovations v. Former Employee',
      court: 'High Court Kuala Lumpur',
      changeType: 'time-change',
      oldValue: '09:00 AM',
      newValue: '02:00 PM',
      detectedAt: '2024-10-27 16:45',
    },
    {
      id: '3',
      caseNo: 'JR-14NCC-201/2024',
      caseTitle: 'Public Interest Org v. Minister',
      court: 'High Court Kuala Lumpur',
      changeType: 'new-listing',
      oldValue: null,
      newValue: '2024-11-20',
      detectedAt: '2024-10-27 10:15',
    },
  ];

  const courts = [
    { value: 'all', label: 'All Courts' },
    { value: 'hc-kl', label: 'High Court Kuala Lumpur' },
    { value: 'hc-ipoh', label: 'High Court Ipoh' },
    { value: 'hc-penang', label: 'High Court Penang' },
    { value: 'hc-jb', label: 'High Court Johor Bahru' },
    { value: 'coa', label: 'Court of Appeal' },
    { value: 'fc', label: 'Federal Court' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'tentative': return 'bg-yellow-100 text-yellow-800';
      case 'changed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case 'date-change': return 'Date Changed';
      case 'time-change': return 'Time Changed';
      case 'new-listing': return 'New Listing';
      case 'cancelled': return 'Cancelled';
      default: return type;
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'new-listing': return 'bg-blue-100 text-blue-800';
      case 'date-change':
      case 'time-change': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-slate-900">CauseList Monitoring</h1>
          <p className="text-slate-600">
            Track all hearings with daily public causelist checking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Alert Settings
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Export Calendar
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      {recentChanges.length > 0 && (
        <Card className="border-orange-300 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-slate-900 mb-1">
                  {recentChanges.length} Recent Causelist Changes
                </h4>
                <p className="text-sm text-slate-700">
                  Changes detected in the last 24 hours. Review and update your calendar.
                </p>
              </div>
              <Button size="sm">Review Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming" className="gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming Hearings
          </TabsTrigger>
          <TabsTrigger value="changes" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Recent Changes
            {recentChanges.length > 0 && (
              <Badge variant="destructive" className="ml-1">
                {recentChanges.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by case number or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterCourt} onValueChange={setFilterCourt}>
                  <SelectTrigger className="w-full lg:w-64">
                    <SelectValue placeholder="Filter by court" />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((court) => (
                      <SelectItem key={court.value} value={court.value}>
                        {court.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Hearings List */}
          <div className="space-y-4">
            {upcomingHearings.map((hearing) => (
              <Card key={hearing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Date Block */}
                    <div className="flex lg:flex-col items-center lg:items-start gap-3 lg:gap-1 lg:w-24">
                      <div className="text-center">
                        <p className="text-3xl text-blue-600">
                          {new Date(hearing.date).getDate()}
                        </p>
                        <p className="text-sm text-slate-600">
                          {new Date(hearing.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(hearing.date).getFullYear()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(hearing.status)}>
                        {hearing.status.charAt(0).toUpperCase() + hearing.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <button
                          onClick={() => onNavigate({ type: 'matter', matterId: hearing.matterId })}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <h3>{hearing.caseTitle}</h3>
                        </button>
                        <p className="text-sm text-slate-600">{hearing.caseNo}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="text-slate-900">{hearing.court}</p>
                            <p className="text-slate-600">{hearing.courtroom}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <div>
                            <p className="text-slate-900">{hearing.time}</p>
                            <p className="text-slate-600">{hearing.type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <p className="text-xs text-slate-600">{hearing.judge}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Last checked: {hearing.lastChecked}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Hearing Pack
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View CauseList
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="changes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent CauseList Changes</CardTitle>
              <CardDescription>
                Automatically detected changes from daily causelist monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentChanges.map((change) => (
                  <Card key={change.id} className="border-l-4 border-l-orange-600">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getChangeTypeColor(change.changeType)}>
                              {getChangeTypeLabel(change.changeType)}
                            </Badge>
                            <Badge variant="outline">{change.caseNo}</Badge>
                          </div>
                          <h4 className="text-slate-900 mb-1">{change.caseTitle}</h4>
                          <p className="text-sm text-slate-600">{change.court}</p>
                        </div>
                        <Button size="sm">Acknowledge</Button>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-3">
                        {change.changeType === 'new-listing' ? (
                          <p className="text-sm text-slate-900">
                            New hearing scheduled for <span className="font-medium">{change.newValue}</span>
                          </p>
                        ) : (
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex-1">
                              <p className="text-slate-600">Previous:</p>
                              <p className="text-slate-900 font-medium">{change.oldValue}</p>
                            </div>
                            <div className="text-slate-400">→</div>
                            <div className="flex-1">
                              <p className="text-slate-600">Updated:</p>
                              <p className="text-slate-900 font-medium">{change.newValue}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mt-2">
                        Detected at {change.detectedAt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Monitoring Status */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Status</CardTitle>
          <CardDescription>
            Active tracking for your matters across Malaysian courts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl text-slate-900">24</p>
              <p className="text-xs text-slate-600">Matters Tracked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-slate-900">8</p>
              <p className="text-xs text-slate-600">Upcoming Hearings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-orange-600">3</p>
              <p className="text-xs text-slate-600">Recent Changes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-green-600">08:00</p>
              <p className="text-xs text-slate-600">Last Checked Today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
