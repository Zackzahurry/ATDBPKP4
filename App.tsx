
import React, { useState } from 'react';
import Layout from './components/Layout.tsx';
import ReportForm from './components/ReportForm.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import LandingPage from './components/LandingPage.tsx';
import { MaintenanceReport, ReportStatus } from './types.ts';

const INITIAL_REPORTS: MaintenanceReport[] = [
  {
    id: 'ATD.BPL.SENG(001)',
    sequence: 1,
    createdAt: new Date('2025-05-20').toISOString(),
    status: ReportStatus.DIGITAL_RECEIVED,
    pasukan: '2 RAMD',
    noPermohonan: 'KPEG/2025/DEMO',
    tarikhPermohonan: '2025-05-20',
    kem: 'Kem Segenting',
    noBangunanUtama: 'B-04',
    namaPemohon: 'MOHD RIZAL BIN AHMAD',
    pangkatPemohon: 'MEJAR',
    jawatanPemohon: 'QM',
    justifikasi: 'Siling runtuh membahayakan anggota bertugas.',
    tindakanSenggaraan: 'Permohonan digital telah diterima. Sila kemukakan borang fizikal yang dicetak untuk tindakan Cwg Log Senggaraan.',
    jenisKerja: ['AWAM'],
    items: [{ id: '1', noBangunan: 'B-04 (Pejabat)', butiranKerja: 'Siling bocor.', kuantiti: '2', catatan: '' }],
    images: { 
      sisi1: 'https://picsum.photos/400/400?1', 
      sisi2: 'https://picsum.photos/400/400?2', 
      keseluruhan: 'https://picsum.photos/400/400?3', 
      closeup: 'https://picsum.photos/400/400?4' 
    }
  }
];

const App: React.FC = () => {
  const [isSystemAuthenticated, setIsSystemAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'REPORT' | 'DASHBOARD'>('REPORT');
  const [reports, setReports] = useState<MaintenanceReport[]>(INITIAL_REPORTS);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleNewReport = (formData: Omit<MaintenanceReport, 'id' | 'sequence' | 'createdAt' | 'status'>) => {
    const nextSeq = reports.length + 1;
    const paddedSeq = String(nextSeq).padStart(3, '0');
    
    const newReport: MaintenanceReport = {
      ...formData,
      sequence: nextSeq,
      id: `ATD.BPL.SENG(${paddedSeq})`,
      createdAt: new Date().toISOString(),
      status: ReportStatus.DIGITAL_RECEIVED
    };
    
    setReports(prev => [newReport, ...prev]);
  };

  const goToDashboard = () => {
    setActiveTab('DASHBOARD');
  };

  if (!isSystemAuthenticated) {
    return <LandingPage onLogin={() => setIsSystemAuthenticated(true)} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isAdminMode}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center no-print">
          <div className="bg-slate-200 p-1.5 rounded-2xl flex shadow-inner border border-slate-300">
            <button 
              onClick={() => setIsAdminMode(false)}
              className={`px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest transition-all ${!isAdminMode ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              LAPORAN
            </button>
            <button 
              onClick={() => setIsAdminMode(true)}
              className={`px-8 py-2.5 rounded-xl font-black text-[10px] tracking-widest transition-all ${isAdminMode ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              PENTADBIR
            </button>
          </div>
        </div>

        {activeTab === 'REPORT' && !isAdminMode ? (
          <ReportForm 
            onSubmit={handleNewReport} 
            onSuccessRedirect={goToDashboard}
          />
        ) : (
          <AdminDashboard 
            reports={reports} 
            onUpdateReport={(updated) => setReports(prev => prev.map(r => r.id === updated.id ? updated : r))} 
            isAdminMode={isAdminMode} 
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
