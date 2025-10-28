import { useState } from 'react';
import { ArrowLeft, FileText, MessageSquare, Clock, FileStack, Gavel, Settings, Users, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DocumentsTab } from './matter/DocumentsTab';
import { ChatTab } from './matter/ChatTab';
import { ChronologyTab } from './matter/ChronologyTab';
import { DraftingTab } from './matter/DraftingTab';
import { BundleBuilderTab } from './matter/BundleBuilderTab';
import { CollaborationTab } from './matter/CollaborationTab';
import type { Page } from '../App';

interface MatterWorkspaceProps {
  matterId: string;
  onNavigate: (page: Page) => void;
}

export function MatterWorkspace({ matterId, onNavigate }: MatterWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock matter data
  const matter = {
    id: matterId,
    title: 'Tan Sri Lim v. ABC Corporation',
    caseNo: 'WA-22NCVC-145/2024',
    court: 'High Court Kuala Lumpur',
    practiceArea: 'Commercial Litigation',
    status: 'trial-prep',
    parties: {
      plaintiff: 'Tan Sri Lim Chee Hwa',
      defendant: 'ABC Corporation Sdn Bhd',
    },
    counsel: {
      lead: 'Ahmad Patel (Senior Associate)',
      team: ['Sarah Wong (Partner)', 'Nurul Amin (Associate)', 'Kumar (Paralegal)'],
    },
    nextHearing: '2025-11-05',
    filingDate: '2024-03-15',
    documentCount: 127,
    tasksDue: 5,
  };

  const stats = [
    { label: 'Documents', value: matter.documentCount, icon: FileText },
    { label: 'Tasks Due', value: matter.tasksDue, icon: Clock },
    { label: 'Team Members', value: matter.counsel.team.length + 1, icon: Users },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 lg:p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate({ type: 'matters' })}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-slate-900 truncate">{matter.title}</h1>
                <Badge className="bg-orange-100 text-orange-800">
                  Trial Prep
                </Badge>
              </div>
              <p className="text-slate-600">{matter.caseNo} • {matter.court}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 hidden lg:flex">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-slate-400" />
                  <div>
                    <p className="text-slate-900">{stat.value}</p>
                    <p className="text-slate-500 text-xs">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="bg-white border-b px-4 lg:px-6">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent space-x-1 overflow-x-auto">
            <TabsTrigger value="overview" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="drafting" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Drafting</span>
            </TabsTrigger>
            <TabsTrigger value="chronology" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Chronology</span>
            </TabsTrigger>
            <TabsTrigger value="bundles" className="gap-2">
              <FileStack className="h-4 w-4" />
              <span className="hidden sm:inline">Bundles</span>
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="overview" className="mt-0 p-4 lg:p-6">
            <div className="space-y-6">
              {/* Case Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                  <CardDescription>Key details about this matter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Plaintiff/Applicant</p>
                      <p className="mt-1">{matter.parties.plaintiff}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Defendant/Respondent</p>
                      <p className="mt-1">{matter.parties.defendant}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Practice Area</p>
                      <p className="mt-1">{matter.practiceArea}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Filing Date</p>
                      <p className="mt-1">{matter.filingDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Next Hearing</p>
                      <p className="mt-1">{matter.nextHearing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Lead Counsel</p>
                      <p className="mt-1">{matter.counsel.lead}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for this matter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setActiveTab('documents')}>
                      <Upload className="h-4 w-4" />
                      Upload Documents
                    </Button>
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setActiveTab('chat')}>
                      <MessageSquare className="h-4 w-4" />
                      Ask AI Question
                    </Button>
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setActiveTab('drafting')}>
                      <FileText className="h-4 w-4" />
                      Generate Draft
                    </Button>
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setActiveTab('chronology')}>
                      <Clock className="h-4 w-4" />
                      View Timeline
                    </Button>
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setActiveTab('bundles')}>
                      <FileStack className="h-4 w-4" />
                      Build Bundle
                    </Button>
                    <Button variant="outline" className="justify-start gap-2" onClick={() => setActiveTab('collaboration')}>
                      <Users className="h-4 w-4" />
                      Manage Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <DocumentsTab matterId={matterId} />
          </TabsContent>

          <TabsContent value="chat" className="mt-0">
            <ChatTab matterId={matterId} />
          </TabsContent>

          <TabsContent value="drafting" className="mt-0">
            <DraftingTab matterId={matterId} />
          </TabsContent>

          <TabsContent value="chronology" className="mt-0">
            <ChronologyTab matterId={matterId} />
          </TabsContent>

          <TabsContent value="bundles" className="mt-0">
            <BundleBuilderTab matterId={matterId} />
          </TabsContent>

          <TabsContent value="collaboration" className="mt-0">
            <CollaborationTab matterId={matterId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
