import { useState } from 'react';
import { Upload, Search, Filter, FileText, File, Download, Trash2, Eye, FolderOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DocumentsTabProps {
  matterId: string;
}

export function DocumentsTab({ matterId }: DocumentsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());

  const documents = [
    {
      id: '1',
      name: 'Statement of Claim (Amended).pdf',
      type: 'pleading',
      language: 'English',
      uploadDate: '2024-10-15',
      size: '2.4 MB',
      pages: 24,
      status: 'processed',
    },
    {
      id: '2',
      name: 'Defence and Counterclaim.pdf',
      type: 'pleading',
      language: 'English',
      uploadDate: '2024-10-20',
      size: '3.1 MB',
      pages: 31,
      status: 'processed',
    },
    {
      id: '3',
      name: 'Affidavit of Tan Sri Lim.pdf',
      type: 'affidavit',
      language: 'English',
      uploadDate: '2024-10-22',
      size: '1.8 MB',
      pages: 18,
      status: 'processed',
    },
    {
      id: '4',
      name: 'Contract_Agreement_2023.pdf',
      type: 'exhibit',
      language: 'English',
      uploadDate: '2024-10-10',
      size: '5.2 MB',
      pages: 52,
      status: 'processed',
    },
    {
      id: '5',
      name: 'Email_Correspondence_Jan-Mar.pdf',
      type: 'correspondence',
      language: 'English',
      uploadDate: '2024-10-12',
      size: '4.7 MB',
      pages: 47,
      status: 'processed',
    },
    {
      id: '6',
      name: 'Court_Order_Case_Management.pdf',
      type: 'court-order',
      language: 'English',
      uploadDate: '2024-10-05',
      size: '0.8 MB',
      pages: 8,
      status: 'processed',
    },
    {
      id: '7',
      name: 'Expert_Report_Financial.pdf',
      type: 'exhibit',
      language: 'English',
      uploadDate: '2024-10-18',
      size: '6.3 MB',
      pages: 63,
      status: 'processing',
    },
    {
      id: '8',
      name: 'Witness_Statement_Ahmad.pdf',
      type: 'witness-statement',
      language: 'Malay',
      uploadDate: '2024-10-25',
      size: '1.2 MB',
      pages: 12,
      status: 'processed',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pleading': return 'bg-blue-100 text-blue-800';
      case 'affidavit': return 'bg-purple-100 text-purple-800';
      case 'exhibit': return 'bg-green-100 text-green-800';
      case 'correspondence': return 'bg-yellow-100 text-yellow-800';
      case 'court-order': return 'bg-red-100 text-red-800';
      case 'witness-statement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const toggleDocSelection = (docId: string) => {
    const newSelection = new Set(selectedDocs);
    if (newSelection.has(docId)) {
      newSelection.delete(docId);
    } else {
      newSelection.add(docId);
    }
    setSelectedDocs(newSelection);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Upload Area */}
      <Card className="border-dashed border-2 border-slate-300 bg-slate-50">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-slate-900 mb-2">Upload Documents</h3>
            <p className="text-sm text-slate-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button>Choose Files</Button>
              <Button variant="outline">Connect Cloud Storage</Button>
              <Button variant="outline">Email Intake</Button>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Supports PDF, DOCX, XLSX. Auto-classification and OCR enabled.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full lg:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pleading">Pleadings</SelectItem>
            <SelectItem value="affidavit">Affidavits</SelectItem>
            <SelectItem value="exhibit">Exhibits</SelectItem>
            <SelectItem value="correspondence">Correspondence</SelectItem>
            <SelectItem value="court-order">Court Orders</SelectItem>
            <SelectItem value="witness-statement">Witness Statements</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedDocs.size > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-900">
                {selectedDocs.size} document{selectedDocs.size > 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Move to Bundle
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedDocs.has(doc.id)}
                        onCheckedChange={() => toggleDocSelection(doc.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate max-w-xs">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(doc.type)}>
                        {getTypeLabel(doc.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>{doc.language}</TableCell>
                    <TableCell>{doc.pages}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>
                      <Badge variant={doc.status === 'processed' ? 'outline' : 'secondary'}>
                        {doc.status === 'processed' ? 'Ready' : 'Processing...'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
