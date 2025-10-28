import { useState } from 'react';
import { Send, FileText, ExternalLink, Sparkles, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface ChatTabProps {
  matterId: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{
    docName: string;
    page: number;
    paragraph?: number;
  }>;
  timestamp: Date;
}

export function ChatTab({ matterId }: ChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: 'What did the defendant say about the termination of employment in their defence?',
      timestamp: new Date('2024-10-28T10:30:00'),
    },
    {
      id: '2',
      role: 'assistant',
      content: 'According to the Defence and Counterclaim, the defendant states that the termination was justified due to gross misconduct. Specifically, they allege that the plaintiff breached confidentiality obligations under clause 12.3 of the Employment Agreement by disclosing proprietary information to competitors. The defendant further claims that they followed proper termination procedures as outlined in the company handbook, including issuing a show cause letter on March 15, 2023, and conducting a domestic inquiry on April 2, 2023.',
      citations: [
        { docName: 'Defence and Counterclaim.pdf', page: 8, paragraph: 15 },
        { docName: 'Defence and Counterclaim.pdf', page: 9, paragraph: 18 },
        { docName: 'Employment_Agreement_2020.pdf', page: 12, paragraph: 3 },
      ],
      timestamp: new Date('2024-10-28T10:30:15'),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    'What are the key disputed facts in this case?',
    'Identify inconsistencies between the affidavits',
    'What legal authorities support our position?',
    'Summarize the plaintiff\'s main arguments',
    'What evidence supports the breach of contract claim?',
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m analyzing your question based on the documents in this matter. This is a placeholder response. In a real implementation, this would be powered by RAG (Retrieval Augmented Generation) to provide accurate answers with citations from your case documents.',
        citations: [
          { docName: 'Statement of Claim.pdf', page: 5, paragraph: 12 },
        ],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 lg:p-6 border-b bg-white">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-slate-900">AI Legal Assistant</h2>
            <p className="text-sm text-slate-600">
              Ask questions about this case. All answers are grounded in your documents with citations.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 p-4 lg:p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Start a conversation</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Ask questions about your case documents
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 mb-3">Try asking:</p>
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="block w-full max-w-md mx-auto text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-3 rounded-lg border border-slate-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'text-right' : ''}`}>
                    <Card className={message.role === 'user' ? 'bg-blue-600 text-white border-blue-600' : ''}>
                      <CardContent className="pt-4">
                        <p className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-slate-900'}`}>
                          {message.content}
                        </p>
                        {message.citations && message.citations.length > 0 && (
                          <div className="mt-4 pt-4 border-t space-y-2">
                            <p className="text-xs text-slate-600 mb-2">Sources:</p>
                            {message.citations.map((citation, index) => (
                              <button
                                key={index}
                                className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded w-full text-left"
                              >
                                <FileText className="h-3 w-3 flex-shrink-0" />
                                <span className="flex-1 truncate">{citation.docName}</span>
                                <Badge variant="outline" className="text-xs">
                                  p. {citation.page}{citation.paragraph && `, ¶${citation.paragraph}`}
                                </Badge>
                                <ExternalLink className="h-3 w-3 flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <p className="text-xs text-slate-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">AP</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length > 0 && (
          <div className="border-t p-4 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs text-slate-600 mb-2">Suggested questions:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="whitespace-nowrap"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-4 lg:p-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask a question about this matter..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[60px] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="gap-2 px-6"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press Enter to send, Shift+Enter for new line. Answers are grounded in case documents only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
