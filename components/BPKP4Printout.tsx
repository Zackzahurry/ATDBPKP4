
import React from 'react';
import { MaintenanceReport } from '../types.ts';

interface BPKP4PrintoutProps {
  report: MaintenanceReport;
}

const ALL_TYPES = ['AWAM', 'ELEKTRIK', 'MEKANIKAL', 'PEMBASMIAN ANAI-ANAI'];

const BPKP4Printout: React.FC<BPKP4PrintoutProps> = ({ report }) => {
  // Helper for cross-out logic
  const renderJenisKerjaHeader = () => {
    return (
      <p className="mt-2 font-bold text-[11px] uppercase tracking-tight">
        KERJA : {' '}
        {ALL_TYPES.map((type, idx) => {
          const isSelected = report.jenisKerja?.includes(type);
          return (
            <React.Fragment key={type}>
              <span className={isSelected ? "" : "line-through decoration-2"}>
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
    <div className="bg-white mx-auto max-w-[210mm] text-black font-serif text-[11px] leading-tight print:p-0">
      
      {/* PAGE 1 - A-1 */}
      <div className="min-h-[297mm] flex flex-col relative px-10 py-8 border-b-2 border-dashed border-slate-200 print:border-none print:min-h-screen">
        
        {/* Header Fixed - TOP */}
        <div className="relative mb-6">
          <div className="text-center font-bold uppercase text-[11px]">TERHAD</div>
          <div className="text-center font-bold text-[11px] -mt-1">A-1</div>
          <div className="absolute right-0 top-0 text-right leading-none uppercase underline decoration-1 underline-offset-2 font-bold text-[10px]">
            KEMBARAN A KEPADA<br />
            ATD.BPL.200 – 7/1/3 ( )<br />
            BERTARIKH &nbsp;&nbsp;&nbsp;&nbsp; JAN 26
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 mt-4">
          <div className="text-center mb-6">
            <h1 className="font-bold text-[13px] uppercase tracking-wide">KERAJAAN MALAYSIA</h1>
            <h2 className="font-bold text-[13px] uppercase tracking-tight">PERMOHONAN KERJA-KERJA SENGGARAAN</h2>
            <div className="flex justify-center items-center gap-2 relative">
              <h2 className="font-bold text-[13px] uppercase tracking-tight">KAWASAN : PORT DICKSON</h2>
              <span className="font-bold text-[11px] absolute -right-2 top-0 text-right leading-none">BPKP 4<br/>(PINDAAN)</span>
            </div>
            {renderJenisKerjaHeader()}
          </div>

          {/* Dual Box Layout */}
          <div className="grid grid-cols-2 border-2 border-black divide-x-2 divide-black">
            {/* Left Box */}
            <div className="p-3 space-y-4 min-h-[220px]">
              <h3 className="font-bold underline uppercase text-[10.5px]">UNTUK DIISI OLEH BPKP/UPKAT</h3>
              <div className="space-y-3 text-[10.5px]">
                <p>No Daftar BPKP : ___________________________</p>
                <p>No Kontrak : ______________________________</p>
                <p>Tempoh Kontrak : ___________________________</p>
                <p>Jenis Senggaraan : __________________________</p>
                <p className="text-[9.5px] italic leading-none pl-4">(Kecemasan, Darurat, Dirancang)</p>
                <p className="pt-8">Tarikh Terima Permohonan : ____________________</p>
              </div>
            </div>

            {/* Right Box */}
            <div className="p-3 space-y-3 min-h-[220px] relative">
              <h3 className="font-bold underline uppercase text-[10.5px]">UNTUK DIISI OLEH PASUKAN</h3>
              <div className="space-y-2 text-[10.5px]">
                <p>Pasukan : <span className="font-bold uppercase ml-1">{report.pasukan}</span></p>
                <p>No Permohonan/Rujukan: <span className="font-bold ml-1 uppercase">{report.noPermohonan}</span></p>
                <p>Tarikh Permohonan : <span className="font-bold ml-1">{new Date(report.tarikhPermohonan).toLocaleDateString('ms-MY')}</span></p>
                <p>Kem : <span className="font-bold uppercase ml-1">{report.kem}</span></p>
                <p>No Bangunan & Kegunaan: <span className="font-bold uppercase ml-1">{report.noBangunanUtama}</span></p>
                <p className="pt-2">Baki Peruntukan : ___________________________</p>
                <p className="pt-4 text-[10px] leading-tight font-bold italic">Tandatangan Pegawai Yang Dibenarkan Membuat Permohonan :</p>
                <div className="h-14"></div>
                <p>Nama : <span className="font-bold uppercase ml-1">{report.namaPemohon}</span></p>
                <p>Pangkat : <span className="font-bold uppercase ml-1">{report.pangkatPemohon}</span></p>
                <p>Jawatan : <span className="font-bold uppercase ml-1">{report.jawatanPemohon}</span></p>
              </div>
            </div>
          </div>

          {/* Unit Stamp Section */}
          <div className="border-x-2 border-b-2 border-black p-3 min-h-[70px] relative mb-6">
             <div className="text-[10.5px] font-bold">Cop Pasukan :</div>
          </div>

          <div className="text-center font-bold mb-1 text-[11px] uppercase underline underline-offset-4 decoration-2">BUTIR-BUTIR KERJA +</div>
          <table className="w-full border-collapse border-2 border-black">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-2 border-black p-2 w-12 text-[10.5px] uppercase">Bil</th>
                <th className="border-2 border-black p-2 w-1/3 text-[10.5px] uppercase">No Bangunan &amp; Kegunaan</th>
                <th className="border-2 border-black p-2 text-[10.5px] uppercase">Butiran Kerja</th>
                <th className="border-2 border-black p-2 text-[10.5px] uppercase">Catatan</th>
              </tr>
              <tr className="text-[9px] h-5">
                <th className="border-2 border-black p-0">(a)</th>
                <th className="border-2 border-black p-0">(b)</th>
                <th className="border-2 border-black p-0">(c)</th>
                <th className="border-2 border-black p-0">(d)</th>
              </tr>
            </thead>
            <tbody>
              {report.items.map((item, i) => (
                <tr key={item.id} className="min-h-[40px]">
                  <td className="border-2 border-black p-2 text-center align-top font-bold">{i + 1}.</td>
                  <td className="border-2 border-black p-2 uppercase font-bold align-top leading-tight">{item.noBangunan}</td>
                  <td className="border-2 border-black p-2 uppercase align-top leading-tight">{item.butiranKerja}</td>
                  <td className="border-2 border-black p-2 text-[10px] align-top">{item.catatan || '-'}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 8 - report.items.length) }).map((_, i) => (
                <tr key={`empty-${i}`} className="h-10">
                  <td className="border-2 border-black p-1"></td>
                  <td className="border-2 border-black p-1"></td>
                  <td className="border-2 border-black p-1"></td>
                  <td className="border-2 border-black p-1"></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Section A */}
          <div className="mt-8 space-y-4">
            <h3 className="font-bold text-[11px] uppercase">A. PENGESAHAN OLEH PENGAWAS SENGGARAAN</h3>
            <p className="indent-12 text-[11px] leading-relaxed text-justify">
              Saya telah memeriksa kerja-kerja yang dipohon oleh pasukan dan mengesahkan pembaikan perlu 
              dilaksanakan. Butir-butir kerja terperinci adalah seperti dilampirkan dan kerja-kerja pembaikan/senggaraan ini 
              dianggarkan sebanyak RM ____________________
            </p>
            <div className="flex justify-between items-end pt-6 px-2">
              <div className="text-[11px] font-bold">Tarikh : ____________________</div>
              <div className="text-right space-y-2">
                <p className="text-[11px] font-bold">Tandatangan : __________________________</p>
                <p className="text-[11px] font-bold uppercase">Nama : __________________________</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 text-center text-[11px] font-bold uppercase">TERHAD</div>
      </div>

      {/* PAGE 2 - A-2 */}
      <div className="min-h-[297mm] flex flex-col relative px-10 py-8 print:break-before-page border-b-2 border-dashed border-slate-200 print:border-none print:min-h-screen">
        <div className="text-center font-bold uppercase text-[11px]">TERHAD</div>
        <div className="text-center font-bold text-[11px] -mt-1 mb-8">A-2</div>

        {/* Body Content B-E */}
        <div className="flex-1 space-y-12">
          <section>
            <h3 className="font-bold uppercase text-[11px]">B. ARAHAN KERJA KEPADA KONTRAKTOR OLEH PEGAWAI INDEN/WAKIL PEGAWAI INDEN</h3>
            <p className="mt-4 leading-relaxed text-[11.5px]">Kontraktor ____________________________________________________ dikehendaki melaksanakan pembaikan ini dan hendaklah disiapkan pada ____________________.</p>
            <div className="flex justify-between items-end mt-8">
              <p className="text-[11px] font-bold">Tarikh : ____________________</p>
              <div className="text-right space-y-2">
                <p className="text-[11px] font-bold">Tandatangan : __________________________</p>
                <p className="text-[11px] font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase text-[11px]">C. PENERIMAAN KERJA OLEH KONTRAKTOR</h3>
            <p className="mt-4 indent-12 leading-relaxed text-[11.5px] text-justify">Saya __________________________________ daripada Syarikat __________________________________ bersetuju melaksanakan kerja ini dengan sempurna dan menggunakan bahan-bahan terbaik. Saya bersetuju keputusan Pegawai Senggaraan BPKP/UPKAT mengenai skop kerja, bahan yang digunakan dan harga yang akan dibayar adalah muktamad. Pembayaran mungkin berbeza dari yang dianggarkan mengikut kerja yang benar-benar dilaksanakan.</p>
            <div className="flex justify-between items-end mt-8">
              <div className="space-y-4">
                <p className="text-[11px] font-bold">Tarikh : ____________________</p>
                <p className="text-[11px] font-bold">Cop Pengesahan : ____________________</p>
              </div>
              <div className="text-right space-y-2">
                <p className="text-[11px] font-bold">Tandatangan : __________________________</p>
                <p className="text-[11px] font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase text-[11px]">D. PENGESAHAN SIAP KERJA OLEH PEGAWAI SENGGARAAN</h3>
            <p className="mt-4 indent-12 leading-relaxed text-[11.5px] text-justify">Saya sahkan yang kerja-kerja di atas/seperti dikepilkan telah diperiksa dan didapati memuaskan. Kerja bermula pada ____________________ dan siap pada ____________________. Saya dengan ini menyokong kontraktor dibayar sejumlah RM ____________________ bagi kerja-kerja tersebut.</p>
            <div className="flex justify-between items-end mt-8">
              <p className="text-[11px] font-bold">Tarikh : ____________________</p>
              <div className="text-right space-y-2">
                <p className="text-[11px] font-bold">Tandatangan : __________________________</p>
                <p className="text-[11px] font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase text-[11px]">E. KELULUSAN BAYARAN KERJA OLEH PEGAWAI INDEN/WAKIL PEGAWAI INDEN</h3>
            <p className="mt-4 indent-12 leading-relaxed text-[11.5px] text-justify">Saya mengesahkan kerja-kerja tersebut telah dilaksanakan dengan sempurna oleh kontraktor ini dan meluluskan bayaran RM ____________________ dibayar kepada kontraktor ini. Dengan ini tempoh membaiki kecacatan adalah bermula dari ____________________ sehingga ____________________</p>
            <div className="flex justify-between items-end mt-8">
              <p className="text-[11px] font-bold">Tarikh : ____________________</p>
              <div className="text-right space-y-2">
                <p className="text-[11px] font-bold">Tandatangan : __________________________</p>
                <p className="text-[11px] font-bold">Nama : __________________________</p>
              </div>
            </div>
          </section>
        </div>

        {/* Notes */}
        <div className="mt-12 text-[10px] space-y-1 italic border-t pt-4 font-bold">
          <p>• Potong yang mana tidak perlu</p>
          <p>• Boleh disertakan dalam lampiran menggunakan Format Borang serupa jika ruangan tidak mencukupi.</p>
        </div>

        <div className="mt-auto pt-8 text-center text-[11px] font-bold uppercase">TERHAD</div>
      </div>

      {/* PAGE 3 - A-3: PHOTOS */}
      <div className="min-h-[297mm] flex flex-col relative px-10 py-8 print:break-before-page print:min-h-screen">
        <div className="text-center font-bold uppercase text-[11px]">TERHAD</div>
        <div className="text-center font-bold text-[11px] -mt-1 mb-8">A-3</div>

        <div className="flex-1">
           <h3 className="font-bold text-center underline uppercase mb-12 text-[12px] decoration-2 underline-offset-4 tracking-widest">LAMPIRAN GAMBAR BUKTI KEROSAKAN (4 SUDUT)</h3>
           <div className="grid grid-cols-2 gap-x-12 gap-y-14">
              <div className="border-2 border-black p-4 text-center bg-white shadow-sm">
                <img src={report.images.sisi1} className="w-full h-72 object-cover grayscale brightness-110 mb-4 border border-black" alt="Sisi 1" />
                <p className="font-bold uppercase text-[10.5px] tracking-tighter">Lampiran 1: Sudut Pandangan Sisi Kanan</p>
              </div>
              <div className="border-2 border-black p-4 text-center bg-white shadow-sm">
                <img src={report.images.sisi2} className="w-full h-72 object-cover grayscale brightness-110 mb-4 border border-black" alt="Sisi 2" />
                <p className="font-bold uppercase text-[10.5px] tracking-tighter">Lampiran 2: Sudut Pandangan Sisi Kiri</p>
              </div>
              <div className="border-2 border-black p-4 text-center bg-white shadow-sm">
                <img src={report.images.keseluruhan} className="w-full h-72 object-cover grayscale brightness-110 mb-4 border border-black" alt="Keseluruhan" />
                <p className="font-bold uppercase text-[10.5px] tracking-tighter">Lampiran 3: Sudut Pandangan Keseluruhan</p>
              </div>
              <div className="border-2 border-black p-4 text-center bg-white shadow-sm">
                <img src={report.images.closeup} className="w-full h-72 object-cover grayscale brightness-110 mb-4 border border-black" alt="Close-up" />
                <p className="font-bold uppercase text-[10.5px] tracking-tighter">Lampiran 4: Sudut Pandangan Fokus (Close-up)</p>
              </div>
           </div>
        </div>

        <div className="mt-auto pt-8 text-center text-[11px] font-bold uppercase">TERHAD</div>
      </div>
    </div>
  );
};

export default BPKP4Printout;
