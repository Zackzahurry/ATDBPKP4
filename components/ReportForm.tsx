
import React, { useState } from 'react';
import { Plus, Trash2, Send, Info, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { MaintenanceReport, ReportStatus, WorkDetail } from '../types.ts';
import ImageUpload from './ImageUpload.tsx';

interface ReportFormProps {
  onSubmit: (formData: Omit<MaintenanceReport, 'id' | 'sequence' | 'createdAt' | 'status'>) => void;
  onSuccessRedirect: () => void;
}

const JENIS_KERJA_OPTIONS = ['AWAM', 'ELEKTRIK', 'MEKANIKAL', 'PEMBASMIAN ANAI-ANAI'];

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, onSuccessRedirect }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<MaintenanceReport, 'id' | 'sequence' | 'createdAt' | 'status'>>({
    pasukan: '',
    noPermohonan: `KPEG-ATD/KM/MEK/${new Date().getFullYear()}/`,
    tarikhPermohonan: new Date().toISOString().split('T')[0],
    kem: '',
    noBangunanUtama: '',
    namaPemohon: '',
    pangkatPemohon: '',
    jawatanPemohon: '',
    justifikasi: '',
    noRujukanLama: '',
    jenisKerja: [],
    items: [{ id: '1', noBangunan: '', butiranKerja: '', kuantiti: '1', catatan: '' }],
    images: { sisi1: '', sisi2: '', keseluruhan: '', closeup: '' }
  });

  const toggleJenisKerja = (option: string) => {
    setFormData(prev => {
      const exists = prev.jenisKerja.includes(option);
      if (exists) {
        return { ...prev, jenisKerja: prev.jenisKerja.filter(item => item !== option) };
      } else {
        return { ...prev, jenisKerja: [...prev.jenisKerja, option] };
      }
    });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: Math.random().toString(36).substr(2, 9), noBangunan: '', butiranKerja: '', kuantiti: '1', catatan: '' }]
    }));
  };

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const updateItem = (id: string, field: keyof WorkDetail, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.jenisKerja.length === 0) {
      alert("Sila pilih sekurang-kurangnya satu Jenis Kerja.");
      return;
    }

    if (!formData.images.sisi1 || !formData.images.sisi2 || !formData.images.keseluruhan || !formData.images.closeup) {
      alert("Sila muat naik keempat-empat (4) sudut gambar yang diwajibkan.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit(formData);
      onSuccessRedirect();
      setIsSubmitting(false);
      window.scrollTo(0, 0);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm animate-in fade-in duration-700 no-print">
        <div className="flex gap-3">
          <AlertTriangle className="text-amber-600 shrink-0" size={24} />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900 text-sm uppercase">Peringatan Penting</h4>
            <p className="text-amber-800 text-xs leading-relaxed">
              Permohonan digital ini adalah langkah awal. Anda <strong>WAJIB</strong> mencetak borang BPKP 4 (selepas dihantar) dan kemukakan permohonan bertulis kepada <strong>Cwg Log Senggaraan</strong> untuk tindakan lanjut.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white text-center">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">Terhad</div>
            <h2 className="text-lg font-medium opacity-80 mb-1 uppercase tracking-wider text-slate-300">KERAJAAN MALAYSIA</h2>
            <h1 className="text-2xl font-black text-blue-400 tracking-tight">BORANG BPKP 4 ONLINE</h1>
            <p className="text-sm mt-2 text-slate-400 font-medium tracking-wide uppercase">BPKP 4 ATD (Interim)</p>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* Pemilihan Jenis Kerja */}
            <section className="space-y-5">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b">
                <CheckCircle size={16} className="text-blue-600" />
                Jenis Senggaraan (Sila Pilih)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {JENIS_KERJA_OPTIONS.map(option => (
                  <div 
                    key={option}
                    onClick={() => toggleJenisKerja(option)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center text-center font-black text-[10px] tracking-tighter ${
                      formData.jenisKerja.includes(option)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </section>

            {/* Maklumat Asas */}
            <section className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b">
                  <Info size={16} className="text-blue-600" />
                  Maklumat Pasukan
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 ml-1">Pasukan / Unit</label>
                    <input required type="text" value={formData.pasukan} onChange={e => setFormData({...formData, pasukan: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase font-medium" placeholder="Cth: 2 RAMD" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 ml-1">Kem</label>
                      <input required type="text" value={formData.kem} onChange={e => setFormData({...formData, kem: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase font-medium" placeholder="Cth: KEM SEGENTING" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 ml-1">No. Bangunan & Kegunaan</label>
                      <input required type="text" value={formData.noBangunanUtama} onChange={e => setFormData({...formData, noBangunanUtama: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase font-medium" placeholder="Cth: B-01 (Pejabat)" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b">
                  <FileText size={16} className="text-blue-600" />
                  Justifikasi Permohonan
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 ml-1">Justifikasi Kerosakan</label>
                    <textarea required rows={2} value={formData.justifikasi} onChange={e => setFormData({...formData, justifikasi: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-medium" placeholder="Nyatakan sebab utama permohonan dibuat..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 ml-1">No. Rujukan Lama (Jika ada)</label>
                    <input type="text" value={formData.noRujukanLama} onChange={e => setFormData({...formData, noRujukanLama: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase font-medium" placeholder="Cth: BPKP/2024/045" />
                  </div>
                </div>
              </div>
            </section>

            {/* Butiran Kerja */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Senarai Butiran Kerosakan</h3>
                <button type="button" onClick={addItem} className="text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-blue-700 transition shadow-sm no-print">
                  <Plus size={14} /> TAMBAH ITEM
                </button>
              </div>
              
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-inner">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-500 uppercase text-[9px] font-black border-b border-slate-200">
                      <th className="px-4 py-3 text-left w-12">Bil</th>
                      <th className="px-4 py-3 text-left">No Bangunan &amp; Kegunaan</th>
                      <th className="px-4 py-3 text-left">Butiran Kerosakan</th>
                      <th className="px-4 py-3 text-center w-24">Kuantiti</th>
                      <th className="px-4 py-3 text-center w-12 no-print"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {formData.items.map((item, index) => (
                      <tr key={item.id} className="group hover:bg-white transition-colors">
                        <td className="px-4 py-4 text-center font-bold text-slate-400">
                          {String.fromCharCode(97 + index)}.
                        </td>
                        <td className="px-4 py-4">
                          <input required type="text" value={item.noBangunan} onChange={e => updateItem(item.id, 'noBangunan', e.target.value)} className="w-full bg-transparent outline-none focus:text-blue-600 font-bold uppercase" placeholder="No Bangunan & Kegunaan" />
                        </td>
                        <td className="px-4 py-4">
                          <input required type="text" value={item.butiranKerja} onChange={e => updateItem(item.id, 'butiranKerja', e.target.value)} className="w-full bg-transparent outline-none focus:text-blue-600 uppercase font-medium" placeholder="Cth: SILING PECAH" />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <input required type="number" min="1" value={item.kuantiti} onChange={e => updateItem(item.id, 'kuantiti', e.target.value)} className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center font-bold" />
                        </td>
                        <td className="px-4 py-4 text-center no-print">
                          <button type="button" onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Gambar 4 Sudut */}
            <section className="space-y-5">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b pb-2">Bukti Gambar 4 Sudut (Wajib)</h3>
              <ImageUpload images={formData.images} onChange={images => setFormData({...formData, images})} />
            </section>

            {/* Pengesahan Pemohon */}
            <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white grid md:grid-cols-3 gap-6 shadow-2xl">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Nama Penuh</label>
                <input required type="text" value={formData.namaPemohon} onChange={e => setFormData({...formData, namaPemohon: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:bg-white/20 outline-none uppercase font-bold text-sm tracking-wide" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Pangkat</label>
                <input required type="text" value={formData.pangkatPemohon} onChange={e => setFormData({...formData, pangkatPemohon: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:bg-white/20 outline-none uppercase font-medium text-sm" placeholder="Cth: MEJAR" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Jawatan</label>
                <input required type="text" value={formData.jawatanPemohon} onChange={e => setFormData({...formData, jawatanPemohon: e.target.value})} className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:bg-white/20 outline-none uppercase font-medium text-sm" placeholder="Cth: KUATERMASTER" />
              </div>
            </section>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 no-print">
            <p className="text-xs text-slate-500 italic max-w-md leading-relaxed font-medium">
              Pastikan semua maklumat, jenis kerja, dan gambar adalah tepat sebelum menghantar permohonan digital ini.
            </p>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-12 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest"
            >
              {isSubmitting ? (
                <>Menghantar...</>
              ) : (
                <>
                  <Send size={20} />
                  HANTAR LAPORAN
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
