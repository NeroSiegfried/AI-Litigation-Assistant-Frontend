import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Matters } from './components/Matters';
import { MatterWorkspace } from './components/MatterWorkspace';
import { CalendarView } from './components/CalendarView';
import { CauseListMonitoring } from './components/CauseListMonitoring';
import { Settings } from './components/Settings';

export type Page = 
  | { type: 'dashboard' }
  | { type: 'matters' }
  | { type: 'matter'; matterId: string }
  | { type: 'calendar' }
  | { type: 'causelist' }
  | { type: 'settings' };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'dashboard' });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage.type) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'matters':
        return <Matters onNavigate={setCurrentPage} />;
      case 'matter':
        return <MatterWorkspace matterId={currentPage.matterId} onNavigate={setCurrentPage} />;
      case 'calendar':
        return <CalendarView onNavigate={setCurrentPage} />;
      case 'causelist':
        return <CauseListMonitoring onNavigate={setCurrentPage} />;
      case 'settings':
        return <Settings onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {renderPage()}
      </main>
    </div>
  );
}
