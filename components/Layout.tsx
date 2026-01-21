
import React from 'react';
import { LayoutDashboard, FileText, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'REPORT' | 'DASHBOARD';
  setActiveTab: (tab: 'REPORT' | 'DASHBOARD') => void;
  isAdmin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="text-blue-400" />
            <span>BPKP 4 Digital</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Kawasan: Port Dickson</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('REPORT')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'REPORT' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <FileText size={20} />
            <span>Mohon Senggaraan</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('DASHBOARD')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'DASHBOARD' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} />
            <span>{isAdmin ? 'Semua Permohonan' : 'Laporan Saya'}</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          Versi Digital 1.0 (TERHAD)
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden flex justify-around bg-slate-900 text-white p-3 fixed bottom-0 w-full z-50 border-t border-slate-800">
        <button onClick={() => setActiveTab('REPORT')} className={`flex flex-col items-center gap-1 ${activeTab === 'REPORT' ? 'text-blue-400' : 'text-slate-400'}`}>
          <FileText size={24} />
          <span className="text-[10px]">Lapor</span>
        </button>
        <button onClick={() => setActiveTab('DASHBOARD')} className={`flex flex-col items-center gap-1 ${activeTab === 'DASHBOARD' ? 'text-blue-400' : 'text-slate-400'}`}>
          <LayoutDashboard size={24} />
          <span className="text-[10px]">Status</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 pb-20 md:pb-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="md:hidden font-bold text-slate-800 flex items-center gap-2">
             <FileText className="text-blue-600" size={20} />
             <span>BPKP 4</span>
          </div>
          <div className="hidden md:block"></div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">{isAdmin ? 'Pentadbir' : 'Staf Pasukan'}</p>
                <p className="text-xs text-slate-500">{isAdmin ? 'Bahagian Senggaraan' : 'Kem Port Dickson'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
