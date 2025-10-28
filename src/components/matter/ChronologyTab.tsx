import { useState } from 'react';
import { Clock, Filter, Download, Plus, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ChronologyTabProps {
  matterId: string;
}

export function ChronologyTab({ matterId }: ChronologyTabProps) {
  const [filterParty, setFilterParty] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const timelineEvents = [
    {
      id: '1',
      date: '2023-01-15',
      title: 'Employment Agreement Signed',
      description: 'Plaintiff signed employment contract with Defendant company',
      party: 'both',
      type: 'contractual',
      disputed: false,
      source: { doc: 'Employment_Agreement_2020.pdf', page: 1 },
    },
    {
      id: '2',
      date: '2023-03-10',
      title: 'Alleged Breach of Confidentiality',
      description: 'Defendant alleges plaintiff disclosed proprietary information',
      party: 'defendant',
      type: 'allegation',
      disputed: true,
      source: { doc: 'Defence and Counterclaim.pdf', page: 8 },
    },
    {
      id: '3',
      date: '2023-03-15',
      title: 'Show Cause Letter Issued',
      description: 'Defendant issued show cause letter to plaintiff',
      party: 'defendant',
      type: 'procedural',
      disputed: false,
      source: { doc: 'Show_Cause_Letter.pdf', page: 1 },
    },
    {
      id: '4',
      date: '2023-03-22',
      title: 'Plaintiff\'s Response to Show Cause',
      description: 'Plaintiff denied allegations and provided explanation',
      party: 'plaintiff',
      type: 'procedural',
      disputed: false,
      source: { doc: 'Affidavit of Tan Sri Lim.pdf', page: 12 },
    },
    {
      id: '5',
      date: '2023-04-02',
      title: 'Domestic Inquiry Conducted',
      description: 'Company conducted internal disciplinary hearing',
      party: 'defendant',
      type: 'procedural',
      disputed: false,
      source: { doc: 'Domestic_Inquiry_Minutes.pdf', page: 1 },
    },
    {
      id: '6',
      date: '2023-04-10',
      title: 'Termination of Employment',
      description: 'Defendant terminated plaintiff\'s employment',
      party: 'defendant',
      type: 'contractual',
      disputed: true,
      source: { doc: 'Termination_Letter.pdf', page: 1 },
    },
    {
      id: '7',
      date: '2024-03-15',
      title: 'Writ Filed',
      description: 'Plaintiff filed writ claiming wrongful dismissal',
      party: 'plaintiff',
      type: 'procedural',
      disputed: false,
      source: { doc: 'Writ and Statement of Claim.pdf', page: 1 },
    },
  ];

  const issues = [
    {
      id: '1',
      title: 'Whether the termination was justified',
      type: 'law',
      status: 'disputed',
      plaintiffPosition: 'Termination was wrongful and without proper cause',
      defendantPosition: 'Termination justified due to gross misconduct',
      relatedEvents: ['2', '6'],
    },
    {
      id: '2',
      title: 'Whether domestic inquiry was properly conducted',
      type: 'law',
      status: 'disputed',
      plaintiffPosition: 'Inquiry was biased and violated natural justice',
      defendantPosition: 'Proper procedures were followed per company policy',
      relatedEvents: ['5'],
    },
    {
      id: '3',
      title: 'Whether plaintiff breached confidentiality',
      type: 'fact',
      status: 'disputed',
      plaintiffPosition: 'No confidential information was disclosed',
      defendantPosition: 'Plaintiff shared trade secrets with competitor',
      relatedEvents: ['2'],
    },
    {
      id: '4',
      title: 'Quantum of damages (if successful)',
      type: 'law',
      status: 'dependent',
      plaintiffPosition: 'Claims 24 months salary plus benefits',
      defendantPosition: 'No damages payable; alternatively nominal amount',
      relatedEvents: [],
    },
  ];

  const filteredEvents = timelineEvents.filter(event => {
    const matchesParty = filterParty === 'all' || event.party === filterParty || event.party === 'both';
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesParty && matchesType;
  });

  const getPartyColor = (party: string) => {
    switch (party) {
      case 'plaintiff': return 'bg-blue-100 text-blue-800';
      case 'defendant': return 'bg-orange-100 text-orange-800';
      case 'both': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIssueTypeColor = (type: string) => {
    switch (type) {
      case 'law': return 'bg-purple-100 text-purple-800';
      case 'fact': return 'bg-blue-100 text-blue-800';
      case 'dependent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline" className="gap-2">
            <Clock className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="issues" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Issue Map
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Select value={filterParty} onValueChange={setFilterParty}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by party" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Parties</SelectItem>
                    <SelectItem value="plaintiff">Plaintiff</SelectItem>
                    <SelectItem value="defendant">Defendant</SelectItem>
                    <SelectItem value="both">Joint Events</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full lg:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contractual">Contractual</SelectItem>
                    <SelectItem value="procedural">Procedural</SelectItem>
                    <SelectItem value="allegation">Allegations</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Event
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Case Chronology</CardTitle>
              <CardDescription>
                Auto-extracted timeline from all case documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

                {/* Events */}
                <div className="space-y-8">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center">
                        {event.disputed ? (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                      </div>

                      {/* Event card */}
                      <Card className={event.disputed ? 'border-orange-300' : ''}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{event.date}</Badge>
                                {event.disputed && (
                                  <Badge variant="destructive" className="text-xs">
                                    Disputed
                                  </Badge>
                                )}
                              </div>
                              <h4 className="text-slate-900 mb-1">{event.title}</h4>
                              <p className="text-sm text-slate-600">{event.description}</p>
                            </div>
                            <Badge className={getPartyColor(event.party)}>
                              {event.party === 'both' ? 'Both' : event.party.charAt(0).toUpperCase() + event.party.slice(1)}
                            </Badge>
                          </div>
                          <button className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 mt-3">
                            <FileText className="h-3 w-3" />
                            {event.source.doc} (p. {event.source.page})
                          </button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Issue Map</CardTitle>
              <CardDescription>
                Questions of law and fact with party positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <Card key={issue.id} className="border-l-4 border-l-blue-600">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-slate-900 flex-1">{issue.title}</h4>
                        <Badge className={getIssueTypeColor(issue.type)}>
                          {issue.type === 'law' ? 'Question of Law' : issue.type === 'fact' ? 'Question of Fact' : 'Dependent'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-slate-600 mb-1">Plaintiff's Position</p>
                          <p className="text-sm text-slate-900">{issue.plaintiffPosition}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <p className="text-xs text-slate-600 mb-1">Defendant's Position</p>
                          <p className="text-sm text-slate-900">{issue.defendantPosition}</p>
                        </div>
                      </div>

                      {issue.relatedEvents.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-xs text-slate-600 mb-2">Related Timeline Events:</p>
                          <div className="flex gap-2 flex-wrap">
                            {issue.relatedEvents.map((eventId) => {
                              const event = timelineEvents.find(e => e.id === eventId);
                              return event ? (
                                <Badge key={eventId} variant="outline" className="text-xs">
                                  {event.date}: {event.title}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contradictions & Inconsistencies</CardTitle>
              <CardDescription>
                AI-detected discrepancies between parties' evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-4 border-l-red-600 bg-red-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-slate-900 mb-2">Date Discrepancy: Show Cause Response</h4>
                      <p className="text-sm text-slate-700 mb-3">
                        Plaintiff claims in affidavit that response was submitted on 20 March 2023, but Defendant's records show receipt on 22 March 2023.
                      </p>
                      <div className="flex gap-2 text-xs">
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          Affidavit p.12
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          Defence p.9
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-l-orange-600 bg-orange-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-slate-900 mb-2">Factual Inconsistency: Meeting Attendance</h4>
                      <p className="text-sm text-slate-700 mb-3">
                        Witness Ahmad states he attended the 10 March meeting, but email records show he was on leave that day.
                      </p>
                      <div className="flex gap-2 text-xs">
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          Witness Statement p.5
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          Email_Correspondence.pdf p.23
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
