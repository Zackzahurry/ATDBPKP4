
import React from 'react';
import { Camera, ImagePlus, CheckCircle2 } from 'lucide-react';

interface ImageUploadProps {
  images: {
    sisi1: string;
    sisi2: string;
    keseluruhan: string;
    closeup: string;
  };
  onChange: (images: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onChange }) => {
  const handleFileChange = (slot: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...images, [slot]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const slots = [
    { id: 'sisi1', label: 'Sisi Kanan', desc: 'Sudut pandangan kanan' },
    { id: 'sisi2', label: 'Sisi Kiri', desc: 'Sudut pandangan kiri' },
    { id: 'keseluruhan', label: 'Keseluruhan', desc: 'Menampakkan bangunan' },
    { id: 'closeup', label: 'Dekat (Close-up)', desc: 'Fokus pada kerosakan' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {slots.map((slot) => (
        <div key={slot.id} className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight">{slot.label}</label>
          <div 
            onClick={() => document.getElementById(`input-${slot.id}`)?.click()}
            className={`relative aspect-square rounded-xl border-2 border-dashed overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all ${
              images[slot.id as keyof typeof images] 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            {images[slot.id as keyof typeof images] ? (
              <>
                <img src={images[slot.id as keyof typeof images]} className="w-full h-full object-cover" alt={slot.label} />
                <div className="absolute inset-0 bg-emerald-600/20 flex items-center justify-center">
                  <CheckCircle2 className="text-white drop-shadow-md" size={32} />
                </div>
              </>
            ) : (
              <div className="text-center p-2">
                <Camera className="mx-auto text-slate-400 mb-1" size={24} />
                <p className="text-[9px] text-slate-500 font-medium leading-tight">{slot.desc}</p>
              </div>
            )}
          </div>
          <input 
            id={`input-${slot.id}`}
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => handleFileChange(slot.id, e)} 
          />
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
