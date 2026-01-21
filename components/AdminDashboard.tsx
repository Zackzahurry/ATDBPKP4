
import React, { useState } from 'react';
import { Eye, Clock, CheckCircle, Search, MessageSquare, ChevronRight, FileText, Printer, ShieldCheck, AlertCircle, Info, ClipboardList, Calendar, Hash, Lock, LogIn, Download, FileSpreadsheet } from 'lucide-react';
import { MaintenanceReport, ReportStatus } from '../types';
import BPKP4Printout from './BPKP4Printout';

interface AdminDashboardProps {
  reports: MaintenanceReport[];
  onUpdateReport: (report: MaintenanceReport) => void;
  isAdminMode: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ reports, onUpdateReport, isAdminMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);

  const [selectedReport, setSelectedReport] = useState<MaintenanceReport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewPrintMode, setViewPrintMode] = useState(false);
  
  const [editStatus, setEditStatus] = useState<ReportStatus | null>(null);
  const [editAction, setEditAction] = useState('');
  const [editTarikhBertulis, setEditTarikhBertulis] = useState('');
  const [editNoRujukBertulis, setEditNoRujukBertulis] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === '12345') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ms-MY', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleExportExcel = () => {
    const sortedReports = [...reports].sort((a, b) => 
      a.noBangunanUtama.localeCompare(b.noBangunanUtama, undefined, { numeric: true })
    );

    // Menggunakan teknik HTML Table untuk membolehkan styling, merging (colspan/rowspan) dan alignment dalam Excel
    let excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <style>
          .title { font-family: Arial; font-size: 14pt; font-weight: bold; text-align: center; }
          .header-row { font-family: Arial; font-size: 10pt; font-weight: bold; text-align: center; background-color: #E2E8F0; border: 1px solid black; }
          .data-cell { font-family: Arial; font-size: 10pt; border: 1px solid black; padding: 4px; }
          .center { text-align: center; }
          .bg-yellow { background-color: #FFFF00; font-weight: bold; text-align: center; border: 1px solid black; }
        </style>
      </head>
      <body>
        <table>
          <tr><td colspan="11" class="title">SKOP KERJA SENGGARAAN KOREKTIF DASAR SEDIA ADA (TAMBAHAN) TAHUN 2027</td></tr>
          <tr><td colspan="11" class="title">PASUKAN AKADEMI TENTERA DARAT</td></tr>
          <tr><td colspan="11" class="title">KEM SEGENTING</td></tr>
          <tr><td colspan="11"></td></tr>
          
          <tr>
            <td rowspan="2" class="header-row">BIL</td>
            <td rowspan="2" class="header-row">PASUKAN</td>
            <td rowspan="2" class="header-row">KEM/LOKASI</td>
            <td rowspan="2" class="header-row">NO BANGUNAN/<br>KEGUNAAN</td>
            <td rowspan="2" class="header-row">SKOP KERJA</td>
            <td colspan="3" class="header-row">ANGGARAN KOS (RM)</td>
            <td rowspan="2" class="header-row">JUMLAH (RM)</td>
            <td rowspan="2" class="header-row">KEUTAMAAN</td>
            <td rowspan="2" class="header-row">JANGKAMASA<br>PROJEK</td>
          </tr>
          <tr>
            <td class="header-row">AWAM</td>
            <td class="header-row">ELEKTRIK</td>
            <td class="header-row">MEKANIKAL</td>
          </tr>
          <tr class="header-row" style="background-color: #F8FAFC;">
            <td>(a)</td><td>(b)</td><td>(c)</td><td>(d)</td><td>(e)</td><td>(f)</td><td>(g)</td><td>(h)</td><td>(i)</td><td>(j)</td><td>(k)</td>
          </tr>
          <tr><td colspan="11" class="bg-yellow">PENGINAPAN</td></tr>
    `;

    sortedReports.forEach((r, index) => {
      const skopKerjaHtml = r.items
        .map((item, idx) => `${String.fromCharCode(97 + idx)}. ${item.butiranKerja}`)
        .join('<br>');

      const isAwam = r.jenisKerja.includes('AWAM');
      const isElektrik = r.jenisKerja.includes('ELEKTRIK');
      const isMekanikal = r.jenisKerja.includes('MEKANIKAL');

      excelTemplate += `
        <tr>
          <td class="data-cell center">${index + 1}</td>
          <td class="data-cell">${r.pasukan}</td>
          <td class="data-cell">${r.kem}</td>
          <td class="data-cell center" style="font-weight: bold;">${r.noBangunanUtama}</td>
          <td class="data-cell">${skopKerjaHtml}</td>
          <td class="data-cell center">${isAwam ? '0.00' : ''}</td>
          <td class="data-cell center">${isElektrik ? '0.00' : ''}</td>
          <td class="data-cell center">${isMekanikal ? '0.00' : ''}</td>
          <td class="data-cell center" style="font-weight: bold;">0.00</td>
          <td class="data-cell"></td>
          <td class="data-cell"></td>
        </tr>
      `;
    });

    excelTemplate += `
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `SKOP_KERJA_SENGGARAAN_2027.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdate = () => {
    if (selectedReport && editStatus) {
      const updated: MaintenanceReport = {
        ...selectedReport,
        status: editStatus,
        tindakanSenggaraan: editAction,
        tarikhTindakan: new Date().toISOString(),
        tarikhLaporanBertulis: editStatus === ReportStatus.WRITTEN_RECEIVED ? editTarikhBertulis : selectedReport.tarikhLaporanBertulis,
        noRujukanLaporanBertulis: editStatus === ReportStatus.WRITTEN_RECEIVED ? editNoRujukBertulis : selectedReport.noRujukanLaporanBertulis,
      };
      onUpdateReport(updated);
      setSelectedReport(updated);
      alert("Status permohonan telah dikemaskini.");
    }
  };

  const filteredReports = reports.filter(r => 
    r.pasukan.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusSteps = [
    ReportStatus.DIGITAL_RECEIVED,
    ReportStatus.WRITTEN_RECEIVED,
    ReportStatus.FORWARDED_ATD,
    ReportStatus.FORWARDED_PLDTD,
    ReportStatus.APPROVED,
    ReportStatus.COMPLETED
  ];

  const getStatusIndex = (currentStatus: ReportStatus) => {
    if (currentStatus === ReportStatus.NOT_APPROVED) return 4;
    return statusSteps.indexOf(currentStatus);
  };

  if (isAdminMode && !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="bg-slate-900 p-8 text-center text-white">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <Lock size={32} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-widest">Akses Pentadbir</h2>
            <p className="text-xs text-slate-400 mt-2 font-medium">Sila masukkan kelayakan untuk teruskan</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-shake">
                <AlertCircle size={16} /> ID Pengguna atau Kata Laluan Salah
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">ID Pengguna</label>
              <input 
                required
                type="text" 
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" 
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1">Kata Laluan</label>
              <input 
                required
                type="password" 
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-xs tracking-widest mt-4">
              <LogIn size={18} /> LOG MASUK
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
            {isAdminMode ? 'Pusat Kawalan Senggaraan' : 'Status Permohonan'}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            {isAdminMode ? 'Tinjau dan urus permohonan BPKP 4 yang diterima.' : 'Sila semak status permohonan anda di bawah.'}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 no-print">
          {isAdminMode && (
            <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all shadow-md shadow-emerald-100"
            >
              <FileSpreadsheet size={18} /> EXPORT EXCEL 2027
            </button>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari ID / Pasukan..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm w-full md:w-64 transition-all shadow-sm font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 no-print">
        {filteredReports.map((report) => (
          <div 
            key={report.id} 
            onClick={() => { 
              setSelectedReport(report); 
              setEditStatus(report.status); 
              setEditAction(report.tindakanSenggaraan || ''); 
              setEditTarikhBertulis(report.tarikhLaporanBertulis || new Date().toISOString().split('T')[0]);
              setEditNoRujukBertulis(report.noRujukanLaporanBertulis || '');
              setViewPrintMode(false);
              window.scrollTo(0,0);
            }}
            className="bg-white p-5 rounded-2xl border-2 hover:border-blue-500 transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  report.status === ReportStatus.COMPLETED ? 'bg-emerald-100 text-emerald-600' :
                  report.status === ReportStatus.NOT_APPROVED ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {report.status === ReportStatus.COMPLETED ? <CheckCircle size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 uppercase tracking-tight">{report.pasukan}</h4>
                  <p className="text-[10px] text-slate-500 font-mono font-black uppercase">
                    {report.id} BERTARIKH {formatDate(report.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border-2 ${
                    report.status === ReportStatus.COMPLETED ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    report.status === ReportStatus.NOT_APPROVED ? 'bg-red-50 text-red-700 border-red-100' :
                    'bg-blue-50 text-blue-700 border-blue-100'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-50 w-full max-w-5xl my-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b bg-white flex items-center justify-between no-print">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><FileText size={20} /></div>
                <div>
                  <h3 className="font-black text-slate-800 uppercase tracking-tighter">
                    {viewPrintMode ? 'Paparan BPKP 4 Rasmi' : 'Butiran Laporan Digital'}
                  </h3>
                  <p className="text-[10px] text-blue-600 font-mono font-black uppercase">{selectedReport.id} BERTARIKH {formatDate(selectedReport.createdAt)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewPrintMode(!viewPrintMode)}
                  className="px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 border-2 bg-white text-blue-600 border-blue-100 hover:border-blue-500 shadow-sm"
                >
                  {viewPrintMode ? <ChevronRight className="rotate-180" size={16} /> : <Printer size={16} />}
                  {viewPrintMode ? 'KEMBALI KE DETAIL' : 'CETAK BPKP 4 (PDF)'}
                </button>
                <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <ChevronRight className="rotate-45" size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
              {viewPrintMode ? (
                <div className="bg-white rounded-xl shadow-inner border p-2">
                  <BPKP4Printout report={selectedReport} />
                </div>
              ) : (
                <>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-3 mb-8">
                       <Clock size={16} className="text-blue-500" /> Aliran Status Permohonan
                    </div>
                    
                    <div className="relative w-full px-4 pt-4 pb-12">
                       <div className="flex justify-between items-start relative">
                         <div className="absolute left-0 right-0 h-1 bg-slate-100 top-5 -z-10 mx-8"></div>
                         <div 
                           className="absolute left-0 h-1 bg-blue-500 top-5 -z-10 transition-all duration-1000 mx-8"
                           style={{ width: `${(getStatusIndex(selectedReport.status) / (statusSteps.length - 1)) * 95}%` }}
                         ></div>
                         
                         {statusSteps.map((step, idx) => {
                           const isActive = getStatusIndex(selectedReport.status) >= idx;
                           const isCurrent = getStatusIndex(selectedReport.status) === idx;
                           
                           let stepDate = "";
                           let stepRef = "";
                           
                           if (step === ReportStatus.DIGITAL_RECEIVED) {
                             stepDate = formatDate(selectedReport.createdAt);
                             stepRef = selectedReport.id;
                           } else if (step === ReportStatus.WRITTEN_RECEIVED && selectedReport.tarikhLaporanBertulis) {
                             stepDate = formatDate(selectedReport.tarikhLaporanBertulis);
                             stepRef = selectedReport.noRujukanLaporanBertulis || "";
                           }

                           return (
                             <div key={step} className="flex flex-col items-center gap-3 relative z-10 w-[110px]">
                               <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-sm ${
                                 isActive ? 'bg-blue-600 border-blue-100' : 'bg-white border-slate-100'
                               }`}>
                                 {isActive ? <CheckCircle size={18} className="text-white" /> : <div className="w-2 h-2 bg-slate-200 rounded-full"></div>}
                               </div>
                               <div className="flex flex-col items-center text-center">
                                 <span className={`text-[7px] md:text-[8px] font-black uppercase leading-tight transition-all mb-1 ${
                                   isCurrent ? 'text-blue-600 scale-110' : 'text-slate-500'
                                 }`}>
                                   {step}
                                 </span>
                                 {stepDate && (
                                   <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-1">
                                      <span className="text-[10px] md:text-[11px] font-black text-slate-800">{stepDate}</span>
                                      {stepRef && <span className="text-[7px] font-bold text-blue-600 tracking-tighter uppercase leading-none mt-0.5">{stepRef}</span>}
                                   </div>
                                 )}
                               </div>
                             </div>
                           );
                         })}
                       </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-6 pt-6 border-t">
                      <div className="p-6 bg-slate-900 text-white rounded-2xl md:max-w-md w-full shadow-lg relative">
                        <div className="flex items-center gap-2 mb-3 text-blue-400 font-black text-[10px] uppercase tracking-wider">
                           <MessageSquare size={14} /> MAKLUMBALAS CWG LOG SENGGARAAN
                        </div>
                        <p className="text-sm italic leading-relaxed text-slate-100">
                          {selectedReport.tindakanSenggaraan || 'Permohonan digital telah diterima. Sila kemukakan borang fizikal yang dicetak untuk tindakan Cwg Log Senggaraan.'}
                        </p>
                      </div>
                      <div className="flex-1 bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                         <AlertCircle className="text-blue-600 shrink-0" size={24} />
                         <div>
                            <h4 className="text-[11px] font-black text-blue-900 uppercase mb-2">Peringatan Penting</h4>
                            <p className="text-xs text-blue-800 leading-relaxed font-medium">
                              Sila pastikan maklumat di bawah lengkap. Tekan butang <strong>"CETAK BPKP 4 (PDF)"</strong> untuk menyediakan dokumen rasmi bagi tujuan penghantaran fizikal.
                            </p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {isAdminMode && (
                    <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-xl space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-blue-100 flex items-center gap-2">
                        <ShieldCheck size={20} /> Kawalan Pentadbir Cwg Log Senggaraan
                      </h4>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-blue-100 uppercase">Kemaskini Status</label>
                            <select 
                              value={editStatus || ''} 
                              onChange={(e) => setEditStatus(e.target.value as ReportStatus)}
                              className="w-full bg-white text-slate-900 border-none rounded-xl px-4 py-3 outline-none font-black text-sm"
                            >
                              {Object.values(ReportStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>

                          {editStatus === ReportStatus.WRITTEN_RECEIVED && (
                            <div className="bg-blue-700/50 p-4 rounded-xl space-y-4 border border-blue-500 animate-in zoom-in-95 duration-300">
                               <p className="text-[10px] font-black uppercase text-blue-100 flex items-center gap-2 border-b border-blue-500 pb-2 mb-2">
                                  <FileText size={14}/> Maklumat Surat Fizikal (Laporan Bertulis)
                               </p>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="block text-[9px] font-bold text-blue-200 uppercase flex items-center gap-1">
                                      <Calendar size={10} /> Tarikh Terima
                                    </label>
                                    <input 
                                      type="date" 
                                      value={editTarikhBertulis} 
                                      onChange={e => setEditTarikhBertulis(e.target.value)}
                                      className="w-full bg-white text-slate-900 border-none rounded-lg px-3 py-2 outline-none font-bold text-xs" 
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="block text-[9px] font-bold text-blue-200 uppercase flex items-center gap-1">
                                      <Hash size={10} /> No Rujuk Surat
                                    </label>
                                    <input 
                                      type="text" 
                                      value={editNoRujukBertulis} 
                                      onChange={e => setEditNoRujukBertulis(e.target.value)}
                                      placeholder="Cth: ATD.400..."
                                      className="w-full bg-white text-slate-900 border-none rounded-lg px-3 py-2 outline-none font-bold text-xs placeholder:text-slate-300 uppercase" 
                                    />
                                  </div>
                               </div>
                            </div>
                          )}

                          <button onClick={handleUpdate} className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 text-xs uppercase tracking-widest">
                            SIMPAN KEMASKINI
                          </button>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-blue-100 uppercase">Maklumbalas Rasmi</label>
                          <textarea 
                            value={editAction} 
                            onChange={(e) => setEditAction(e.target.value)}
                            rows={8} 
                            className="w-full bg-white text-slate-900 border-none rounded-xl px-4 py-3 outline-none resize-none text-xs font-medium"
                            placeholder="Contoh: Permohonan dalam pemeriksaan teknikal..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                          <Info size={14} /> Informasi Am Permohonan
                        </h4>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-sm font-medium">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500 text-[10px] uppercase font-bold">Pasukan:</span>
                            <span className="font-black uppercase text-slate-800">{selectedReport.pasukan}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500 text-[10px] uppercase font-bold">Kem:</span>
                            <span className="font-black uppercase text-slate-800">{selectedReport.kem}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500 text-[10px] uppercase font-bold">Pemohon:</span>
                            <span className="font-black uppercase text-slate-800">{selectedReport.namaPemohon}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-slate-500 text-[10px] uppercase font-bold">Pangkat/Jawatan:</span>
                            <span className="font-black uppercase text-slate-800 text-right">{selectedReport.pangkatPemohon} ({selectedReport.jawatanPemohon})</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 text-[10px] uppercase font-bold">No. Rujukan Lama:</span>
                            <span className="font-black uppercase text-slate-800">{selectedReport.noRujukanLama || '-'}</span>
                          </div>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                          <ClipboardList size={14} /> Skop & Justifikasi
                        </h4>
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Jenis Kerja:</span>
                            <div className="flex flex-wrap gap-2">
                              {selectedReport.jenisKerja.map(jk => (
                                <span key={jk} className="px-2 py-1 bg-blue-50 text-blue-700 text-[9px] font-black rounded border border-blue-100">{jk}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Justifikasi:</span>
                            <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                              {selectedReport.justifikasi}
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>

                    <section className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                        <ClipboardList size={14} /> Senarai Butiran Kerosakan
                      </h4>
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 text-slate-500 font-black uppercase text-[9px]">
                            <tr>
                              <th className="px-4 py-3 w-12 text-center">Bil</th>
                              <th className="px-4 py-3">No. Bangunan & Nama Prasarana</th>
                              <th className="px-4 py-3">Butiran Kerosakan</th>
                              <th className="px-4 py-3 w-20 text-center">Kuantiti</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {selectedReport.items.map((item, idx) => (
                              <tr key={item.id} className="text-slate-700">
                                <td className="px-4 py-3 text-center font-bold">{idx + 1}</td>
                                <td className="px-4 py-3 font-black uppercase">{item.noBangunan}</td>
                                <td className="px-4 py-3 uppercase">{item.butiranKerja}</td>
                                <td className="px-4 py-3 text-center font-bold">{item.kuantiti}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">Bukti Gambar 4 Sudut</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(selectedReport.images).map(([key, src]) => (
                          <div key={key} className="space-y-2">
                            <img src={src} className="aspect-square w-full object-cover rounded-xl border-2 border-white shadow-md" alt={key} />
                            <p className="text-[9px] text-center font-black text-slate-400 uppercase">{key.replace('sisi', 'SISI ')}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center text-[9px] font-bold text-slate-400 uppercase gap-2 italic">
                      <div className="flex items-center gap-1">
                        <span>NO RUJUKAN DIGITAL:</span>
                        <span className="text-blue-500 font-mono tracking-tighter">{selectedReport.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>TARIKH DIHANTAR:</span>
                        <span className="tracking-tighter">{new Date(selectedReport.createdAt).toLocaleString('ms-MY')}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
