import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter, Download, Calendar as CalendarIcon, Clock, MapPin, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import type { Page } from '../App';

interface CalendarViewProps {
  onNavigate: (page: Page) => void;
}

interface CalendarEvent {
  id: string;
  matterId: string;
  title: string;
  caseNo: string;
  type: 'hearing' | 'deadline' | 'filing' | 'meeting' | 'reminder';
  date: string;
  time?: string;
  location?: string;
  description?: string;
  status: 'confirmed' | 'tentative' | 'completed';
}

export function CalendarView({ onNavigate }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('month');
  const [filterType, setFilterType] = useState('all');
  const [newEventOpen, setNewEventOpen] = useState(false);

  const events: CalendarEvent[] = [
    {
      id: '1',
      matterId: '1',
      title: 'Case Management',
      caseNo: 'WA-22NCVC-145/2024',
      type: 'hearing',
      date: '2024-11-05',
      time: '09:00 AM',
      location: 'High Court KL - Court 5.2',
      description: 'Tan Sri Lim v. ABC Corporation',
      status: 'confirmed',
    },
    {
      id: '2',
      matterId: '1',
      title: 'File Defence',
      caseNo: 'WA-22NCVC-145/2024',
      type: 'deadline',
      date: '2024-11-08',
      description: 'Submit Defence and Counterclaim',
      status: 'confirmed',
    },
    {
      id: '3',
      matterId: '2',
      title: 'Judicial Review Hearing',
      caseNo: 'JR-14NCC-278/2023',
      type: 'hearing',
      date: '2024-11-12',
      time: '02:30 PM',
      location: 'High Court Ipoh - Court 3.1',
      description: 'XYZ Sdn Bhd v. State Government',
      status: 'confirmed',
    },
    {
      id: '4',
      matterId: '3',
      title: 'Submit Bundle of Authorities',
      caseNo: 'CA-01(A)-89/2024',
      type: 'filing',
      date: '2024-11-15',
      description: 'File bundle 7 days before hearing',
      status: 'confirmed',
    },
    {
      id: '5',
      matterId: '1',
      title: 'Client Meeting',
      caseNo: 'WA-22NCVC-145/2024',
      type: 'meeting',
      date: '2024-11-18',
      time: '03:00 PM',
      location: 'Office - Conference Room A',
      description: 'Discuss trial strategy with Tan Sri Lim',
      status: 'tentative',
    },
    {
      id: '6',
      matterId: '4',
      title: 'Affidavit Due',
      caseNo: 'WA-22NCVC-167/2024',
      type: 'deadline',
      date: '2024-11-20',
      description: 'Affidavit of Evidence in Chief',
      status: 'confirmed',
    },
    {
      id: '7',
      matterId: '2',
      title: 'Discovery Deadline',
      caseNo: 'JR-14NCC-278/2023',
      type: 'deadline',
      date: '2024-11-22',
      description: 'Complete discovery process',
      status: 'confirmed',
    },
    {
      id: '8',
      matterId: '5',
      title: 'Mention',
      caseNo: 'WA-22NCVC-189/2024',
      type: 'hearing',
      date: '2024-11-25',
      time: '09:30 AM',
      location: 'High Court KL - Court 4.1',
      description: 'Tech Innovations v. Former Employee',
      status: 'confirmed',
    },
    {
      id: '9',
      matterId: '3',
      title: 'Appeal Hearing',
      caseNo: 'CA-01(A)-89/2024',
      type: 'hearing',
      date: '2024-12-01',
      time: '10:00 AM',
      location: 'Court of Appeal Putrajaya',
      description: 'DG Immigration v. Ramesh Kumar',
      status: 'tentative',
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const getWeekDates = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day; // Get Sunday of current week
    const sunday = new Date(date.getFullYear(), date.getMonth(), diff);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(sunday);
      weekDate.setDate(sunday.getDate() + i);
      weekDates.push(weekDate);
    }
    return weekDates;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'hearing': return 'bg-blue-600 text-white';
      case 'deadline': return 'bg-red-600 text-white';
      case 'filing': return 'bg-orange-600 text-white';
      case 'meeting': return 'bg-green-600 text-white';
      case 'reminder': return 'bg-purple-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getEventTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(event => event.type === filterType);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-slate-900">Calendar</h1>
          <p className="text-slate-600">
            All hearings, deadlines, and case events in one place
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Calendar Event</DialogTitle>
                <DialogDescription>
                  Create a new event, deadline, or reminder
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hearing">Court Hearing</SelectItem>
                      <SelectItem value="deadline">Filing Deadline</SelectItem>
                      <SelectItem value="filing">Document Filing</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-title">Title</Label>
                  <Input id="event-title" placeholder="e.g., Case Management Hearing" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time (Optional)</Label>
                    <Input id="event-time" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-matter">Related Matter</Label>
                  <Select>
                    <SelectTrigger id="event-matter">
                      <SelectValue placeholder="Select matter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">WA-22NCVC-145/2024</SelectItem>
                      <SelectItem value="2">JR-14NCC-278/2023</SelectItem>
                      <SelectItem value="3">CA-01(A)-89/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-location">Location (Optional)</Label>
                  <Input id="event-location" placeholder="e.g., High Court KL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <textarea
                    id="event-description"
                    className="w-full px-3 py-2 border rounded-md min-h-[60px]"
                    placeholder="Add notes..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setNewEventOpen(false)}>
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* View Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-[200px] text-center">
                <h2 className="text-slate-900">{monthName}</h2>
              </div>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
              >
                Today
              </Button>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="hearing">Hearings</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                  <SelectItem value="filing">Filings</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                </SelectContent>
              </Select>
              <Tabs value={view} onValueChange={(v) => setView(v as 'month' | 'week' | 'agenda')}>
                <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Views */}
      {view === 'month' && (
        <Card>
          <CardContent className="pt-6">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-200 border rounded-lg overflow-hidden">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-slate-100 p-2 text-center text-sm text-slate-600">
                  {day}
                </div>
              ))}
              
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="bg-white p-2 min-h-[120px]" />
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                cellDate.setHours(0, 0, 0, 0);
                const dayEvents = getEventsForDate(cellDate).filter(event => 
                  filterType === 'all' || event.type === filterType
                );
                const isToday = cellDate.getTime() === today.getTime();
                
                return (
                  <div
                    key={day}
                    className={`bg-white p-2 min-h-[120px] ${isToday ? 'ring-2 ring-blue-600' : ''}`}
                  >
                    <div className={`text-sm mb-2 ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-slate-900'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <button
                          key={event.id}
                          onClick={() => onNavigate({ type: 'matter', matterId: event.matterId })}
                          className={`w-full text-left px-2 py-1 rounded text-xs truncate ${getEventTypeColor(event.type)}`}
                        >
                          {event.time && <span className="mr-1">{event.time}</span>}
                          {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-slate-500 px-2">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {view === 'week' && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Week header */}
              <div className="grid grid-cols-7 gap-2">
                {getWeekDates(currentDate).map((weekDate, index) => {
                  const isToday = weekDate.getTime() === today.getTime();
                  return (
                    <div key={index} className="text-center">
                      <div className="text-sm text-slate-600">
                        {weekDate.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-2xl mt-1 ${isToday ? 'bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto' : 'text-slate-900'}`}>
                        {weekDate.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Week events */}
              <div className="grid grid-cols-7 gap-2">
                {getWeekDates(currentDate).map((weekDate, index) => {
                  const dayEvents = getEventsForDate(weekDate).filter(event => 
                    filterType === 'all' || event.type === filterType
                  );
                  return (
                    <div key={index} className="border rounded-lg p-2 min-h-[300px] bg-white">
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => onNavigate({ type: 'matter', matterId: event.matterId })}
                            className={`w-full text-left px-2 py-2 rounded text-xs ${getEventTypeColor(event.type)}`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            {event.time && <div className="text-xs opacity-90 mt-1">{event.time}</div>}
                            <div className="text-xs opacity-90 mt-1 truncate">{event.caseNo}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {view === 'agenda' && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Chronological list of all events and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex gap-4">
                      {/* Date */}
                      <div className="flex flex-col items-center w-16 flex-shrink-0">
                        <div className="text-2xl text-blue-600">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-slate-600">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(event.date).getFullYear()}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <button
                              onClick={() => onNavigate({ type: 'matter', matterId: event.matterId })}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <h4>{event.title}</h4>
                            </button>
                            <p className="text-sm text-slate-600">{event.caseNo}</p>
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-slate-700">{event.description}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                          {event.time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-blue-600 text-white">Hearing</Badge>
            <Badge className="bg-red-600 text-white">Deadline</Badge>
            <Badge className="bg-orange-600 text-white">Filing</Badge>
            <Badge className="bg-green-600 text-white">Meeting</Badge>
            <Badge className="bg-purple-600 text-white">Reminder</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
