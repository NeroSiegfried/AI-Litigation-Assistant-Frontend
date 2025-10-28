import { useState } from 'react';
import { FileStack, Plus, Download, Eye, Trash2, GripVertical, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface BundleBuilderTabProps {
  matterId: string;
}

export function BundleBuilderTab({ matterId }: BundleBuilderTabProps) {
  const [bundles, setBundles] = useState([
    {
      id: '1',
      name: 'Trial Bundle - Plaintiff',
      type: 'trial',
      status: 'draft',
      documents: 15,
      pages: 287,
      lastModified: '2024-10-25',
    },
    {
      id: '2',
      name: 'Bundle of Authorities',
      type: 'authorities',
      status: 'ready',
      documents: 12,
      pages: 156,
      lastModified: '2024-10-24',
    },
    {
      id: '3',
      name: 'Agreed Bundle - Documents',
      type: 'agreed',
      status: 'draft',
      documents: 8,
      pages: 124,
      lastModified: '2024-10-26',
    },
  ]);

  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [newBundleOpen, setNewBundleOpen] = useState(false);

  const bundleDocuments = [
    { id: '1', name: 'Cover Page', type: 'cover', pages: 1, included: true },
    { id: '2', name: 'Index', type: 'index', pages: 2, included: true },
    { id: '3', name: 'Statement of Claim (Amended)', type: 'pleading', pages: 24, included: true },
    { id: '4', name: 'Defence and Counterclaim', type: 'pleading', pages: 31, included: true },
    { id: '5', name: 'Affidavit of Tan Sri Lim', type: 'affidavit', pages: 18, included: true },
    { id: '6', name: 'Employment Agreement', type: 'exhibit', pages: 52, included: true },
    { id: '7', name: 'Email Correspondence', type: 'exhibit', pages: 47, included: false },
    { id: '8', name: 'Court Order (Case Management)', type: 'court-order', pages: 8, included: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBundleTypeLabel = (type: string) => {
    switch (type) {
      case 'trial': return 'Trial Bundle';
      case 'authorities': return 'Bundle of Authorities';
      case 'agreed': return 'Agreed Bundle';
      default: return type;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Bundle Builder</h2>
          <p className="text-sm text-slate-600">
            Create paginated, bookmarked PDF bundles with auto-indexing
          </p>
        </div>
        <Dialog open={newBundleOpen} onOpenChange={setNewBundleOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Bundle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Bundle</DialogTitle>
              <DialogDescription>
                Configure bundle settings and document structure
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bundle-name">Bundle Name</Label>
                <Input id="bundle-name" placeholder="e.g., Trial Bundle - Plaintiff" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bundle-type">Bundle Type</Label>
                <select id="bundle-type" className="w-full px-3 py-2 border rounded-md">
                  <option value="trial">Trial Bundle</option>
                  <option value="authorities">Bundle of Authorities</option>
                  <option value="agreed">Agreed Bundle</option>
                  <option value="hearing">Hearing Pack</option>
                  <option value="custom">Custom Bundle</option>
                </select>
              </div>
              <div className="space-y-3">
                <Label>Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="auto-pagination" defaultChecked />
                    <label htmlFor="auto-pagination" className="text-sm">
                      Auto-pagination
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="bookmarks" defaultChecked />
                    <label htmlFor="bookmarks" className="text-sm">
                      Generate PDF bookmarks
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="hyperlinks" defaultChecked />
                    <label htmlFor="hyperlinks" className="text-sm">
                      Hyperlinked cross-references
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="cover-page" defaultChecked />
                    <label htmlFor="cover-page" className="text-sm">
                      Generate cover page
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="toc" defaultChecked />
                    <label htmlFor="toc" className="text-sm">
                      Generate table of contents
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewBundleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewBundleOpen(false)}>
                Create Bundle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bundles List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <Card
            key={bundle.id}
            className={`cursor-pointer transition-all ${
              selectedBundle === bundle.id ? 'ring-2 ring-blue-600' : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedBundle(bundle.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="truncate">{bundle.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {getBundleTypeLabel(bundle.type)}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(bundle.status)}>
                  {bundle.status.charAt(0).toUpperCase() + bundle.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Documents:</span>
                  <span className="text-slate-900">{bundle.documents}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Total Pages:</span>
                  <span className="text-slate-900">{bundle.pages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Modified:</span>
                  <span className="text-slate-900">{bundle.lastModified}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bundle Editor */}
      {selectedBundle && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bundle Contents</CardTitle>
                <CardDescription>
                  Drag to reorder • Auto-regenerates when pages change
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Documents
                </Button>
                <Button size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Generate PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {bundleDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    doc.included ? 'bg-white' : 'bg-slate-50 opacity-60'
                  }`}
                >
                  <Checkbox checked={doc.included} />
                  <button className="cursor-move p-1 hover:bg-slate-100 rounded">
                    <GripVertical className="h-4 w-4 text-slate-400" />
                  </button>
                  <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-100 text-xs text-slate-600">
                    {index + 1}
                  </div>
                  <FileText className="h-4 w-4 text-slate-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500">
                      {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • {doc.pages} page{doc.pages > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      pp. {index === 0 ? 1 : bundleDocuments.slice(0, index).reduce((sum, d) => sum + (d.included ? d.pages : 0), 1)}-
                      {bundleDocuments.slice(0, index + 1).reduce((sum, d) => sum + (d.included ? d.pages : 0), 0)}
                    </Badge>
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl text-slate-900">
                    {bundleDocuments.filter(d => d.included).length}
                  </p>
                  <p className="text-xs text-slate-600">Documents</p>
                </div>
                <div>
                  <p className="text-2xl text-slate-900">
                    {bundleDocuments.filter(d => d.included).reduce((sum, d) => sum + d.pages, 0)}
                  </p>
                  <p className="text-xs text-slate-600">Total Pages</p>
                </div>
                <div>
                  <p className="text-2xl text-slate-900">
                    ~{Math.round(bundleDocuments.filter(d => d.included).reduce((sum, d) => sum + d.pages, 0) * 0.5)}
                  </p>
                  <p className="text-xs text-slate-600">Est. MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common bundle operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <FileStack className="h-4 w-4" />
              Generate Hearing Pack
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <FileText className="h-4 w-4" />
              Create Authorities Bundle
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Download className="h-4 w-4" />
              Export All Bundles
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Settings className="h-4 w-4" />
              Bundle Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
