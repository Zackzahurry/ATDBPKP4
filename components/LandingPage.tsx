
import React, { useState } from 'react';
import { Lock, LogIn, FileText, ShieldCheck, AlertCircle } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // System-wide login: Username: REPORT, Password: 00000
    if (username.toUpperCase() === 'REPORT' && password === '00000') {
      onLogin();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-800/20 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-500/20 mb-6">
            <FileText size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            BPKP 4 <span className="text-blue-500">ATD (Interim)</span>
          </h1>
          {/* Slogan dibuang seperti yang diminta */}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-white font-black text-sm uppercase tracking-wider">Log Masuk Sistem</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Sila masukkan ID Pengguna & Kata Laluan</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl flex items-center gap-3 text-red-400 text-xs font-bold animate-shake">
                <AlertCircle size={18} />
                ID Pengguna atau Kata Laluan Salah
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">ID Pengguna</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all uppercase"
                placeholder="REPORT"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Kata Laluan</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase mt-4"
            >
              <LogIn size={18} /> AKSES PORTAL
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest">
            HAKCIPTA TERPELIHARA &copy; 2026 KEM SEGENTING PORT DICKSON
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
