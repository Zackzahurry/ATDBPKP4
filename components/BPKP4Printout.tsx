
import React from 'react';
import { MaintenanceReport } from '../types.ts';

interface BPKP4PrintoutProps {
  report: MaintenanceReport;
}

const ALL_TYPES = ['AWAM', 'ELEKTRIK', 'JENTERA', 'PEMBASMIAN ANAI-ANAI'];

const BPKP4Printout: React.FC<BPKP4PrintoutProps> = ({ report }) => {
  // Helper for cross-out logic
  const renderJenisKerjaHeader = () => {
    return (
      <p className="mt-1 font-bold text-[10.5px] uppercase tracking-tight">
        KERJA : {' '}
        {ALL_TYPES.map((type, idx) => {
          const isSelected = report.jenisKerja?.includes(type === 'JENTERA' ? 'MEKANIKAL' : type);
          return (
            <React.Fragment key={type}>
              <span className={isSelected ? "" : "line-through decoration-1"}>
                {type}
              </span>
              {idx < ALL_TYPES.length - 1 ? ' / ' : '*'}
            </React.Fragment>
          );
        })}
      </p>
    );
  };

  return (
    <div className="bg-white mx-auto max-w-[210mm] text-black font-serif leading-tight print:p-0">
      
      {/* PAGE 1 - A-1 */}
      <div className="min-h-[297mm] flex flex-col relative px-10 py-6 border-b-2 border-dashed border-slate-200 print:border-none print:min-h-screen">
        
        {/* Header Section */}
        <div className="relative mb-4 text-center">
          <div className="font-bold uppercase text-[11px]">TERHAD</div>
          <div className="absolute right-0 top-0 text-right leading-none uppercase underline decoration-1 underline-offset-2 font-bold text-[9px]">
            KEMBARAN A KEPADA<br />
            ATD.BPL.200 – 7/1/3 ( )<br />
            BERTARIKH &nbsp;&nbsp;&nbsp;&nbsp; JAN 26
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-[12px] uppercase">KERAJAAN MALAYSIA</h1>
          <h2 className="font-bold text-[12px] uppercase">PERMOHONAN KERJA-KERJA SENGGARAAN BPKP 4</h2>
          <div className="flex justify-center items-center gap-2 relative">
            <h2 className="font-bold text-[12px] uppercase">KAWASAN : PORT DICKSON (PINDAAN)</h2>
          </div>
          {renderJenisKerjaHeader()}
        </div>

        {/* Top Dual Boxes */}
        <div className="grid grid-cols-2 border-2 border-black divide-x-2 divide-black mb-4">
          {/* Left Box */}
          <div className="p-2 space-y-2 min-h-[140px] text-[10px]">
            <h3 className="font-bold underline uppercase">UNTUK DIISI OLEH BPKP/UPKAT</h3>
            <p>No Daftar BPKP : ___________________________</p>
            <p>No Kontrak : ______________________________</p>
            <p>Tempoh Kontrak : ___________________________</p>
            <p>Jenis Senggaraan : __________________________</p>
            <p className="text-[8px] italic leading-none pl-4">(Kecemasan, Darurat, Dirancang)</p>
            <div className="pt-4">
              <p>Tarikh Terima Permohonan : ____________________</p>
            </div>
          </div>

          {/* Right Box */}
          <div className="p-2 space-y-2 min-h-[140px] text-[10px]">
            <h3 className="font-bold underline uppercase">UNTUK DIISI OLEH PASUKAN</h3>
            <p>Pasukan : <span className="font-bold uppercase">{report.pasukan}</span></p>
            <p>No Permohonan/Rujukan: <span className="font-bold uppercase">{report.noPermohonan}</span></p>
            <p>Tarikh Permohonan : <span className="font-bold">{new Date(report.tarikhPermohonan).toLocaleDateString('ms-MY')}</span></p>
            <p>Kem : <span className="font-bold uppercase">{report.kem}</span></p>
            <p>No Bangunan : <span className="font-bold uppercase">{report.noBangunanUtama}</span></p>
            <div className="pt-2">
              <p>Baki Peruntukan : ___________________________</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Stamp and Signature Info */}
        <div className="grid grid-cols-2 border-x-2 border-b-2 border-black mb-4 min-h-[120px]">
          <div className="p-2 border-r-2 border-black flex flex-col justify-between">
            <div className="text-[10px] font-bold">Cop Pasukan :</div>
            <div className="h-16"></div>
          </div>
          <div className="p-2 space-y-1 text-[10px]">
             <p className="font-bold leading-tight">Tandatangan Pegawai Yang Dibenarkan Membuat Permohonan :</p>
             <div className="h-8"></div>
             <p>Permohonan : ___________________________</p>
             <p>Nama : <span className="font-bold uppercase">{report.namaPemohon}</span></p>
             <p>Pangkat : <span className="font-bold uppercase">{report.pangkatPemohon}</span></p>
             <p>Jawatan : <span className="font-bold uppercase">{report.jawatanPemohon}</span></p>
          </div>
        </div>

        {/* Table Section */}
        <div className="text-center font-bold mb-1 text-[11px] uppercase underline underline-offset-4">BUTIR-BUTIR KERJA +</div>
        <table className="w-full border-collapse border-2 border-black text-[10px]">
          <thead>
            <tr>
              <th className="border-2 border-black p-1 w-10 uppercase">Bil</th>
              <th className="border-2 border-black p-1 w-1/3 uppercase">No bangunan Jenis Prasarana</th>
              <th className="border-2 border-black p-1 uppercase">Butiran Kerja</th>
              <th className="border-2 border-black p-1 w-24 uppercase">Catatan</th>
            </tr>
            <tr className="text-[8px] h-4 text-center">
              <th className="border-2 border-black p-0">(a)</th>
              <th className="border-2 border-black p-0">(b)</th>
              <th className="border-2 border-black p-0">(c)</th>
              <th className="border-2 border-black p-0">(d)</th>
            </tr>
          </thead>
          <tbody>
            {report.items.map((item, i) => (
              <tr key={item.id}>
                <td className="border-2 border-black p-1 text-center align-top font-bold">{i + 1}.</td>
                <td className="border-2 border-black p-1 uppercase font-bold align-top leading-tight min-h-[60px]">{item.noBangunan}</td>
                <td className="border-2 border-black p-1 uppercase align-top leading-tight">{item.butiranKerja}</td>
                <td className="border-2 border-black p-1 text-[9px] align-top">{item.catatan || '-'}</td>
              </tr>
            ))}
            {/* Reduced empty rows to ensure Section A fits */}
            {Array.from({ length: Math.max(0, 3 - report.items.length) }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-12">
                <td className="border-2 border-black p-1"></td>
                <td className="border-2 border-black p-1"></td>
                <td className="border-2 border-black p-1"></td>
                <td className="border-2 border-black p-1"></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Section A - MUST STAY ON PAGE 1 */}
        <div className="mt-4 space-y-3">
          <h3 className="font-bold text-[10px] uppercase">A. PENGESAHAN OLEH PENGAWAS SENGGARAAN</h3>
          <p className="indent-10 text-[10px] leading-relaxed text-justify">
            Saya telah memeriksa kerja-kerja yang dipohon oleh pasukan dan mengesahkan pembaikan perlu 
            dilaksananakan. Butir-butir kerja terperinci adalah seperti dilampirkan dan kerja-kerja pembaikan/senggaraan ini 
            dianggarkan sebanyak RM ____________________
          </p>
          <div className="flex justify-between items-end pt-2 text-[10px]">
            <div className="font-bold">Tarikh : ____________________</div>
            <div className="text-right space-y-1">
              <p className="font-bold">Tandatangan : __________________________</p>
              <p className="font-bold uppercase">Nama : __________________________</p>
            </div>
          </div>
        </div>

        {/* Footer Page 1 */}
        <div className="mt-auto pt-4 text-center">
          <div className="font-bold text-[11px] mb-1">A - 1</div>
          <div className="font-bold text-[11px] uppercase">TERHAD</div>
        </div>
      </div>

      {/* PAGE 2 - A-2 */}
      <div className="min-h-[297mm] flex flex-col relative px-10 py-6 print:break-before-page border-b-2 border-dashed border-slate-200 print:border-none print:min-h-screen">
        <div className="text-center font-bold uppercase text-[11px] mb-2">TERHAD</div>

        <div className="flex-1 space-y-10 mt-2">
          <section>
            <h3 className="font-bold uppercase text-[10.5px]">B. ARAHAN KERJA KEPADA KONTRAKTOR OLEH PEGAWAI INDEN/WAKIL PEGAWAI INDEN</h3>
            <p className="mt-3 leading-relaxed text-[10.5px]">Kontraktor ____________________________________________________ dikehendaki melaksanakan pembaikan ini dan hendaklah disiapkan pada ____________________.</p>
            <div className="flex justify-between items-end mt-6 text-[10px]">
              <p className="font-bold">Tarikh : ____________________</p>
              <div className="text-right space-y-1">
                <p className="font-bold">Tandatangan : __________________________</p>
                <p className="font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase text-[10.5px]">C. PENERIMAAN KERJA OLEH KONTRAKTOR</h3>
            <p className="mt-3 leading-relaxed text-[10.5px] text-justify">Saya __________________________________ daripada Syarikat __________________________________ bersetuju melaksanakan kerja ini dengan sempurna dan menggunakan bahan-bahan terbaik. Saya bersetuju keputusan Pegawai Senggaraan BPKP/UPKAT mengenai skop kerja, bahan yang digunakan dan harga yang akan dibayar adalah muktamad. Pembayaran mungkin berbeza dari yang dianggarkan mengikut kerja yang benar-benar dilaksanakan.</p>
            <div className="flex justify-between items-end mt-6 text-[10px]">
              <div className="space-y-4">
                <p className="font-bold">Tarikh : ____________________</p>
                <p className="font-bold">Cop Pengesahan : ____________________</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-bold">Tandatangan : __________________________</p>
                <p className="font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase text-[10.5px]">D. PENGESAHAN SIAP KERJA OLEH PEGAWAI SENGGARAAN</h3>
            <p className="mt-3 leading-relaxed text-[10.5px] text-justify">Saya sahkan yang kerja-kerja di atas/seperti dikepilkan telah diperiksa dan didapati memuaskan. Kerja bermula pada ____________________ dan siap pada ____________________. Saya dengan ini menyokong kontraktor dibayar sejumlah RM ____________________ bagi kerja-kerja tersebut.</p>
            <div className="flex justify-between items-end mt-6 text-[10px]">
              <p className="font-bold">Tarikh : ____________________</p>
              <div className="text-right space-y-1">
                <p className="font-bold">Tandatangan : __________________________</p>
                <p className="font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase text-[10.5px]">E. KELULUSAN BAYARAN KERJA OLEH PEGAWAI INDEN/WAKIL PEGAWAI INDEN</h3>
            <p className="mt-3 leading-relaxed text-[10.5px] text-justify">Saya mengesahkan kerja-kerja tersebut telah dilaksanakan dengan sempurna oleh kontraktor ini dan meluluskan bayaran RM ____________________ dibayar kepada kontraktor ini. Dengan ini tempoh membaiki kecacatan adalah bermula dari ____________________ sehingga ____________________</p>
            <div className="flex justify-between items-end mt-6 text-[10px]">
              <p className="font-bold">Tarikh : ____________________</p>
              <div className="text-right space-y-1">
                <p className="font-bold">Tandatangan : __________________________</p>
                <p className="font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <div className="pt-4 text-[9px] space-y-1 italic border-t border-black/10 font-bold">
            <p>• Potong yang mana tidak perlu</p>
            <p>• Boleh disertakan dalam lampiran menggunakan Format Borang serupa jika ruangan tidak mencukupi.</p>
          </div>
        </div>

        {/* Footer Page 2 */}
        <div className="mt-auto pt-4 text-center">
          <div className="font-bold text-[11px] mb-1">A - 2</div>
          <div className="font-bold text-[11px] uppercase">TERHAD</div>
        </div>
      </div>

      {/* PAGE 3 - A-3: PHOTOS */}
      <div className="min-h-[297mm] flex flex-col relative px-10 py-6 print:break-before-page print:min-h-screen">
        <div className="text-center font-bold uppercase text-[11px] mb-6">TERHAD</div>

        <div className="flex-1">
           <h3 className="font-bold text-center underline uppercase mb-8 text-[11px] tracking-widest">LAMPIRAN GAMBAR BUKTI KEROSAKAN (4 SUDUT)</h3>
           <div className="grid grid-cols-2 gap-8">
              <div className="border border-black p-2 text-center bg-white">
                <img src={report.images.sisi1} className="w-full h-64 object-cover grayscale brightness-110 border border-black" alt="Sisi 1" />
                <p className="font-bold uppercase text-[9px] mt-2">Lampiran 1: Sudut Pandangan Sisi Kanan</p>
              </div>
              <div className="border border-black p-2 text-center bg-white">
                <img src={report.images.sisi2} className="w-full h-64 object-cover grayscale brightness-110 border border-black" alt="Sisi 2" />
                <p className="font-bold uppercase text-[9px] mt-2">Lampiran 2: Sudut Pandangan Sisi Kiri</p>
              </div>
              <div className="border border-black p-2 text-center bg-white">
                <img src={report.images.keseluruhan} className="w-full h-64 object-cover grayscale brightness-110 border border-black" alt="Keseluruhan" />
                <p className="font-bold uppercase text-[9px] mt-2">Lampiran 3: Sudut Pandangan Keseluruhan</p>
              </div>
              <div className="border border-black p-2 text-center bg-white">
                <img src={report.images.closeup} className="w-full h-64 object-cover grayscale brightness-110 border border-black" alt="Close-up" />
                <p className="font-bold uppercase text-[9px] mt-2">Lampiran 4: Sudut Pandangan Fokus (Close-up)</p>
              </div>
           </div>
        </div>

        {/* Footer Page 3 */}
        <div className="mt-auto pt-4 text-center">
          <div className="font-bold text-[11px] mb-1">A - 3</div>
          <div className="font-bold text-[11px] uppercase">TERHAD</div>
        </div>
      </div>
    </div>
  );
};

export default BPKP4Printout;
