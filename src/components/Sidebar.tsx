import { Scale, Briefcase, Calendar, Settings, Menu, X, FileText, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import type { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: FileText, label: 'Dashboard', page: { type: 'dashboard' as const } },
    { icon: Briefcase, label: 'Matters', page: { type: 'matters' as const } },
    { icon: Calendar, label: 'Calendar', page: { type: 'calendar' as const } },
    { icon: Bell, label: 'CauseList', page: { type: 'causelist' as const }, badge: 3 },
    { icon: Settings, label: 'Settings', page: { type: 'settings' as const } },
  ];

  const isActive = (page: Page) => {
    return currentPage.type === page.type;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-full bg-slate-900 text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <Scale className="h-6 w-6 text-blue-400 flex-shrink-0" />
              <span 
                className={`font-semibold whitespace-nowrap transition-opacity duration-300 ${
                  isOpen ? 'opacity-100 delay-200' : 'opacity-0'
                }`}
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                LegalAI Pro
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-white hover:bg-slate-800 flex-shrink-0"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <Separator className="bg-slate-700" />

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.page);
              
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.page)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span 
                    className={`flex-1 text-left whitespace-nowrap transition-opacity duration-300 ${
                      isOpen ? 'opacity-100 delay-200' : 'opacity-0'
                    }`}
                    style={{ display: isOpen ? 'block' : 'none' }}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className={`ml-auto transition-opacity duration-300 ${
                        isOpen ? 'opacity-100 delay-200' : 'opacity-0'
                      }`}
                      style={{ display: isOpen ? 'flex' : 'none' }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User info */}
          <Separator className="bg-slate-700" />
          <div className="p-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span>AP</span>
              </div>
              <div 
                className={`flex-1 min-w-0 transition-opacity duration-300 ${
                  isOpen ? 'opacity-100 delay-200' : 'opacity-0'
                }`}
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <p className="text-sm truncate">Ahmad Patel</p>
                <p className="text-xs text-slate-400 truncate">Senior Associate</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
