import { useState } from 'react';
import { Users, Mail, Shield, Clock, Plus, UserX, Eye, Edit, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CollaborationTabProps {
  matterId: string;
}

export function CollaborationTab({ matterId }: CollaborationTabProps) {
  const [inviteOpen, setInviteOpen] = useState(false);

  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Wong',
      email: 'sarah.wong@lawfirm.com',
      role: 'Partner',
      permission: 'owner',
      initials: 'SW',
      color: 'bg-purple-600',
      lastActive: '2024-10-28 14:30',
    },
    {
      id: '2',
      name: 'Ahmad Patel',
      email: 'ahmad.patel@lawfirm.com',
      role: 'Senior Associate',
      permission: 'editor',
      initials: 'AP',
      color: 'bg-blue-600',
      lastActive: '2024-10-28 15:45',
    },
    {
      id: '3',
      name: 'Nurul Amin',
      email: 'nurul.amin@lawfirm.com',
      role: 'Associate',
      permission: 'editor',
      initials: 'NA',
      color: 'bg-green-600',
      lastActive: '2024-10-28 12:20',
    },
    {
      id: '4',
      name: 'Kumar Selvam',
      email: 'kumar@lawfirm.com',
      role: 'Paralegal',
      permission: 'contributor',
      initials: 'KS',
      color: 'bg-orange-600',
      lastActive: '2024-10-27 18:15',
    },
  ];

  const externalCollaborators = [
    {
      id: '1',
      name: 'Tan Sri Lim Chee Hwa',
      email: 'lim@clientcompany.com',
      type: 'Client',
      permission: 'view-only',
      initials: 'TL',
      color: 'bg-slate-600',
      restrictions: ['No pleadings', 'No legal advice'],
    },
    {
      id: '2',
      name: 'Chen & Partners',
      email: 'chen@opposingcounsel.com',
      type: 'Opposing Counsel',
      permission: 'limited',
      initials: 'CP',
      color: 'bg-red-600',
      restrictions: ['Agreed bundle only', 'No client materials'],
    },
  ];

  const activityLog = [
    {
      id: '1',
      user: 'Ahmad Patel',
      action: 'uploaded',
      target: 'Expert_Report_Financial.pdf',
      timestamp: '2024-10-28 15:45',
    },
    {
      id: '2',
      user: 'Nurul Amin',
      action: 'asked AI question',
      target: '"What are the key disputed facts?"',
      timestamp: '2024-10-28 14:30',
    },
    {
      id: '3',
      user: 'Kumar Selvam',
      action: 'generated draft',
      target: 'Witness Statement - Ahmad',
      timestamp: '2024-10-28 12:20',
    },
    {
      id: '4',
      user: 'Sarah Wong',
      action: 'exported',
      target: 'Trial Bundle - Plaintiff.pdf',
      timestamp: '2024-10-28 10:15',
    },
    {
      id: '5',
      user: 'Tan Sri Lim',
      action: 'viewed',
      target: 'Case Status Update',
      timestamp: '2024-10-27 16:30',
    },
  ];

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'contributor': return 'bg-green-100 text-green-800';
      case 'view-only': return 'bg-gray-100 text-gray-800';
      case 'limited': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionLabel = (permission: string) => {
    return permission.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Team & Collaboration</h2>
          <p className="text-sm text-slate-600">
            Manage permissions and track activity
          </p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Add internal counsel or external collaborators
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permission">Permission Level</Label>
                <Select>
                  <SelectTrigger id="permission">
                    <SelectValue placeholder="Select permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">
                      <div>
                        <p>Editor</p>
                        <p className="text-xs text-slate-500">Full access to all documents and features</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="contributor">
                      <div>
                        <p>Contributor</p>
                        <p className="text-xs text-slate-500">Can upload and comment, limited editing</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="view-only">
                      <div>
                        <p>View Only</p>
                        <p className="text-xs text-slate-500">Read-only access for clients</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="limited">
                      <div>
                        <p>Limited Access</p>
                        <p className="text-xs text-slate-500">Custom restrictions (opposing counsel)</p>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Invitation Message (Optional)</Label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                  placeholder="Add a personal message..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setInviteOpen(false)}>
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internal Team */}
        <Card>
          <CardHeader>
            <CardTitle>Internal Team</CardTitle>
            <CardDescription>Law firm members with access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-slate-50">
                  <Avatar>
                    <AvatarFallback className={`${member.color} text-white`}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 truncate">{member.name}</p>
                    <p className="text-xs text-slate-600 truncate">{member.email}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Last active: {member.lastActive}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPermissionColor(member.permission)}>
                      {getPermissionLabel(member.permission)}
                    </Badge>
                    {member.permission !== 'owner' && (
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* External Collaborators */}
        <Card>
          <CardHeader>
            <CardTitle>External Collaborators</CardTitle>
            <CardDescription>Clients and opposing counsel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {externalCollaborators.map((collaborator) => (
                <div key={collaborator.id} className="p-3 rounded-lg border hover:bg-slate-50">
                  <div className="flex items-start gap-3 mb-2">
                    <Avatar>
                      <AvatarFallback className={`${collaborator.color} text-white`}>
                        {collaborator.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-slate-900 truncate">{collaborator.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {collaborator.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 truncate">{collaborator.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPermissionColor(collaborator.permission)}>
                        {getPermissionLabel(collaborator.permission)}
                      </Badge>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {collaborator.restrictions && (
                    <div className="pl-11">
                      <div className="flex items-center gap-1 text-xs text-slate-600">
                        <Shield className="h-3 w-3" />
                        <span>Restrictions:</span>
                      </div>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {collaborator.restrictions.map((restriction, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {restriction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add External Collaborator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Audit trail of all actions in this matter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50">
                <Clock className="h-4 w-4 text-slate-400 flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-slate-600">{activity.action}</span>{' '}
                    <span className="text-slate-900">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            View Full Audit Log
          </Button>
        </CardContent>
      </Card>

      {/* Compliance Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 mb-1">PDPA 2010 Compliance</h4>
              <p className="text-sm text-slate-700">
                All data is encrypted at rest and in transit. Access is logged for audit purposes.
                Client data is processed in accordance with Malaysian Personal Data Protection Act 2010.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
