import { useState } from 'react';
import { Search, Filter, Plus, Scale, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import type { Page } from '../App';

interface MattersProps {
  onNavigate: (page: Page) => void;
}

export function Matters({ onNavigate }: MattersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMatterOpen, setNewMatterOpen] = useState(false);

  const matters = [
    {
      id: '1',
      title: 'Tan Sri Lim v. ABC Corporation',
      caseNo: 'WA-22NCVC-145/2024',
      court: 'High Court Kuala Lumpur',
      practiceArea: 'Commercial',
      status: 'trial-prep',
      nextDate: '2025-11-05',
      parties: 'Tan Sri Lim (Plaintiff) v. ABC Corporation Sdn Bhd (Defendant)',
      counsel: 'Ahmad Patel (Senior Associate)',
    },
    {
      id: '2',
      title: 'XYZ Sdn Bhd v. State Government',
      caseNo: 'JR-14NCC-278/2023',
      court: 'High Court Ipoh',
      practiceArea: 'Judicial Review',
      status: 'discovery',
      nextDate: '2025-11-12',
      parties: 'XYZ Sdn Bhd (Applicant) v. State Government of Perak (Respondent)',
      counsel: 'Sarah Wong (Partner)',
    },
    {
      id: '3',
      title: 'Director General of Immigration v. Ramesh Kumar',
      caseNo: 'CA-01(A)-89/2024',
      court: 'Court of Appeal Putrajaya',
      practiceArea: 'Immigration',
      status: 'appeal',
      nextDate: '2025-12-01',
      parties: 'Director General of Immigration (Appellant) v. Ramesh Kumar a/l Subramaniam (Respondent)',
      counsel: 'Ahmad Patel (Senior Associate)',
    },
    {
      id: '4',
      title: 'Marina Development Sdn Bhd v. Construction Co',
      caseNo: 'WA-22NCVC-167/2024',
      court: 'High Court Shah Alam',
      practiceArea: 'Construction',
      status: 'pleadings',
      nextDate: '2025-11-20',
      parties: 'Marina Development Sdn Bhd (Plaintiff) v. Mega Construction Co (Defendant)',
      counsel: 'Nurul Amin (Associate)',
    },
    {
      id: '5',
      title: 'Tech Innovations Ltd v. Former Employee',
      caseNo: 'WA-22NCVC-189/2024',
      court: 'High Court Kuala Lumpur',
      practiceArea: 'Employment',
      status: 'discovery',
      nextDate: '2025-11-18',
      parties: 'Tech Innovations Ltd (Plaintiff) v. Kumar Selvam (Defendant)',
      counsel: 'Ahmad Patel (Senior Associate)',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'trial-prep': return 'bg-orange-100 text-orange-800';
      case 'discovery': return 'bg-blue-100 text-blue-800';
      case 'appeal': return 'bg-purple-100 text-purple-800';
      case 'pleadings': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'trial-prep': return 'Trial Prep';
      case 'discovery': return 'Discovery';
      case 'appeal': return 'Appeal';
      case 'pleadings': return 'Pleadings';
      default: return status;
    }
  };

  const filteredMatters = matters.filter(matter => {
    const matchesSearch = matter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         matter.caseNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || matter.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-slate-900">Matters</h1>
          <p className="text-slate-600">Manage all your litigation cases</p>
        </div>
        <Dialog open={newMatterOpen} onOpenChange={setNewMatterOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Matter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Matter</DialogTitle>
              <DialogDescription>
                Enter the case details to create a new matter workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="case-title">Case Title</Label>
                  <Input id="case-title" placeholder="e.g., ABC Corp v. XYZ Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-no">Case Number</Label>
                  <Input id="case-no" placeholder="e.g., WA-22NCVC-145/2024" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="court">Court</Label>
                  <Select>
                    <SelectTrigger id="court">
                      <SelectValue placeholder="Select court" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hc-kl">High Court Kuala Lumpur</SelectItem>
                      <SelectItem value="hc-ipoh">High Court Ipoh</SelectItem>
                      <SelectItem value="hc-penang">High Court Penang</SelectItem>
                      <SelectItem value="hc-jb">High Court Johor Bahru</SelectItem>
                      <SelectItem value="coa">Court of Appeal</SelectItem>
                      <SelectItem value="fc">Federal Court</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practice-area">Practice Area</Label>
                  <Select>
                    <SelectTrigger id="practice-area">
                      <SelectValue placeholder="Select practice area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="judicial-review">Judicial Review</SelectItem>
                      <SelectItem value="immigration">Immigration</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="employment">Employment</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parties">Parties</Label>
                <Input id="parties" placeholder="Plaintiff/Applicant v. Defendant/Respondent" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="counsel">Lead Counsel</Label>
                <Input id="counsel" placeholder="Enter counsel name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Select>
                  <SelectTrigger id="jurisdiction">
                    <SelectValue placeholder="Select jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewMatterOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewMatterOpen(false)}>
                Create Matter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by case name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pleadings">Pleadings</SelectItem>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="trial-prep">Trial Prep</SelectItem>
                <SelectItem value="appeal">Appeal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Matters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMatters.map((matter) => (
          <Card key={matter.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => onNavigate({ type: 'matter', matterId: matter.id })}
                    className="flex-1 text-left"
                  >
                    <h3 className="text-blue-600 hover:text-blue-800 hover:underline">
                      {matter.title}
                    </h3>
                  </button>
                  <Badge className={getStatusColor(matter.status)}>
                    {getStatusLabel(matter.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{matter.caseNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{matter.court}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>Next: {matter.nextDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-slate-500">{matter.parties}</p>
                  <p className="text-xs text-slate-500 mt-1">Lead: {matter.counsel}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{matter.practiceArea}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
