import { Languages, Bell, Shield, FileText, Globe, Users, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import type { Page } from '../App';

interface SettingsProps {
  onNavigate: (page: Page) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Settings</h1>
        <p className="text-slate-600">
          Configure your application preferences and compliance settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Language & Localization */}
          <Card>
            <CardHeader>
              <CardTitle>Language & Localization</CardTitle>
              <CardDescription>
                Configure language preferences for the interface and documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ui-language">Interface Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger id="ui-language">
                    <Languages className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="malay">Bahasa Malaysia</SelectItem>
                    <SelectItem value="bilingual">Bilingual (English/Malay)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-jurisdiction">Default Jurisdiction</Label>
                <Select defaultValue="malaysia">
                  <SelectTrigger id="default-jurisdiction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-court">Default Court Format</Label>
                <Select defaultValue="hc-malaysia">
                  <SelectTrigger id="default-court">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hc-malaysia">High Court - Malaysia</SelectItem>
                    <SelectItem value="coa-malaysia">Court of Appeal - Malaysia</SelectItem>
                    <SelectItem value="fc-malaysia">Federal Court - Malaysia</SelectItem>
                    <SelectItem value="hc-india">High Court - India</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label>Side-by-side Translation</Label>
                  <p className="text-sm text-slate-600">
                    Show English and Malay translations side-by-side in documents
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* AI & Drafting */}
          <Card>
            <CardHeader>
              <CardTitle>AI & Drafting Preferences</CardTitle>
              <CardDescription>
                Configure AI behavior and document generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hallucination Control</Label>
                  <p className="text-sm text-slate-600">
                    Require citations for all AI answers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-save Drafts</Label>
                  <p className="text-sm text-slate-600">
                    Automatically save generated drafts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Legal Citation Verification</Label>
                  <p className="text-sm text-slate-600">
                    Verify case law citations against Malaysian databases
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Default Tone</Label>
                <Select defaultValue="formal">
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal (Court Documents)</SelectItem>
                    <SelectItem value="business">Business Formal</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Firm Information */}
          <Card>
            <CardHeader>
              <CardTitle>Firm Information</CardTitle>
              <CardDescription>
                Your law firm details for document headers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firm-name">Firm Name</Label>
                <Input id="firm-name" defaultValue="Ahmad & Partners" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firm-address">Address</Label>
                <textarea
                  id="firm-address"
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                  defaultValue="Level 20, Menara Tower&#10;Jalan Sultan Ismail&#10;50250 Kuala Lumpur"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firm-phone">Phone</Label>
                  <Input id="firm-phone" defaultValue="+603-2142-8888" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firm-email">Email</Label>
                  <Input id="firm-email" defaultValue="info@ahmadpartners.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when you receive email alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>CauseList Changes</Label>
                  <p className="text-sm text-slate-600">
                    Alert when hearing dates/times change
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Listings</Label>
                  <p className="text-sm text-slate-600">
                    Notify when your cases appear on causelist
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deadline Reminders</Label>
                  <p className="text-sm text-slate-600">
                    Reminders for upcoming deadlines
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Document Upload</Label>
                  <p className="text-sm text-slate-600">
                    Notify when team members upload documents
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Client Messages</Label>
                  <p className="text-sm text-slate-600">
                    Alert for client communication
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Reminder Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Reminder Timing</CardTitle>
              <CardDescription>
                When to send deadline reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-1">First Reminder</Label>
                <Select defaultValue="7">
                  <SelectTrigger id="reminder-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="7">7 days before</SelectItem>
                    <SelectItem value="14">14 days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-2">Second Reminder</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="reminder-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="7">7 days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-3">Final Reminder</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="reminder-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">On the day</SelectItem>
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="2">2 days before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* PDPA Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>PDPA 2010 Compliance</CardTitle>
              <CardDescription>
                Personal Data Protection Act 2010 (Malaysia) settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Encryption</Label>
                  <p className="text-sm text-slate-600">
                    Encrypt all data at rest and in transit
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-800">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-slate-600">
                    Log all data access and modifications
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-800">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Retention Policy</Label>
                  <p className="text-sm text-slate-600">
                    Auto-delete closed matters after specified period
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention-period">Retention Period</Label>
                <Select defaultValue="7">
                  <SelectTrigger id="retention-period">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 years after closure</SelectItem>
                    <SelectItem value="5">5 years after closure</SelectItem>
                    <SelectItem value="7">7 years after closure</SelectItem>
                    <SelectItem value="10">10 years after closure</SelectItem>
                    <SelectItem value="permanent">Permanent retention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bar Council Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Malaysian Bar Council Requirements</CardTitle>
              <CardDescription>
                Compliance with Legal Profession Act and Bar rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Client Confidentiality</Label>
                  <p className="text-sm text-slate-600">
                    Enforce ethical walls between matters
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-800">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Conflict Checking</Label>
                  <p className="text-sm text-slate-600">
                    Check for conflicts before creating matters
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Limitation Period Tracking</Label>
                  <p className="text-sm text-slate-600">
                    Alert for limitation periods under Limitation Act 1953
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Practice Directions */}
          <Card>
            <CardHeader>
              <CardTitle>Court Practice Directions</CardTitle>
              <CardDescription>
                Ensure compliance with current practice directions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-update Practice Directions</Label>
                  <p className="text-sm text-slate-600">
                    Automatically check for updated practice directions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Current Practice Directions</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-slate-900">High Court Malaya - PD No. 1/2023</p>
                      <p className="text-xs text-slate-600">E-Filing Requirements</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Updated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-slate-900">Rules of Court 2012</p>
                      <p className="text-xs text-slate-600">Latest amendments applied</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Current</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
              <CardDescription>
                Manage firm-specific templates for drafting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-slate-900">Commercial Litigation - Statement of Claim</p>
                    <p className="text-xs text-slate-600">High Court format with firm letterhead</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">Delete</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-slate-900">Employment Disputes - Defence Template</p>
                    <p className="text-xs text-slate-600">Standard defence structure</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">Delete</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-slate-900">Judicial Review Application</p>
                    <p className="text-xs text-slate-600">O. 53 format template</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">Delete</Button>
                  </div>
                </div>
              </div>
              <Button className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Upload New Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
