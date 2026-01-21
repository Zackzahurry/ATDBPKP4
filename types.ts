
export enum ReportStatus {
  DIGITAL_RECEIVED = 'Laporan Digital',
  WRITTEN_RECEIVED = 'Laporan Bertulis',
  FORWARDED_ATD = 'Mk ATD',
  FORWARDED_PLDTD = 'Mk PLDTD',
  APPROVED = 'Diluluskan',
  NOT_APPROVED = 'Tidak Lulus Tahun Semasa',
  COMPLETED = 'Selesai'
}

export interface WorkDetail {
  id: string;
  noBangunan: string;
  butiranKerja: string;
  kuantiti: string;
  catatan: string;
}

export interface MaintenanceReport {
  id: string; // Format: ATD.BPL.SENG(001)
  sequence: number;
  createdAt: string;
  status: ReportStatus;
  
  pasukan: string;
  noPermohonan: string;
  tarikhPermohonan: string;
  kem: string;
  noBangunanUtama: string;
  
  namaPemohon: string;
  pangkatPemohon: string;
  jawatanPemohon: string;
  
  justifikasi: string;
  noRujukanLama?: string;
  
  tindakanSenggaraan?: string;
  tarikhTindakan?: string;
  
  tarikhLaporanBertulis?: string;
  noRujukanLaporanBertulis?: string;
  
  jenisKerja: string[];
  
  items: WorkDetail[];
  
  images: {
    sisi1: string;
    sisi2: string;
    keseluruhan: string;
    closeup: string;
  };
}
