
import { GoogleGenAI } from "@google/genai";
import { MaintenanceReport } from "../types.ts";

export const analyzeReport = async (report: MaintenanceReport): Promise<string> => {
  const apiKey = (window as any).process?.env?.API_KEY || "";
  
  if (!apiKey) {
    return "Analisis AI tidak tersedia (API Key tiada).";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Analisis laporan senggaraan berikut:
    Pasukan: ${report.pasukan}
    Kem: ${report.kem}
    Butiran Kerja: ${report.items.map(i => i.butiranKerja).join('; ')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Tiada analisis.";
  } catch (error) {
    return "Gagal melakukan analisis AI.";
  }
};
