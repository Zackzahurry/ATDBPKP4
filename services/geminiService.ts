
import { GoogleGenAI } from "@google/genai";
import { MaintenanceReport } from "../types";

export const analyzeReport = async (report: MaintenanceReport): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY tidak dijumpai dalam environment variables.");
    return "Analisis AI tidak tersedia (API Key tiada).";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Analisis laporan senggaraan berikut dan berikan ringkasan eksekutif dalam Bahasa Melayu.
    Tentukan tahap kecemasan (Low/Medium/High) berdasarkan butiran kerja.

    Pasukan: ${report.pasukan}
    Kem: ${report.kem}
    Butiran Kerja: ${report.items.map(i => `${i.noBangunan}: ${i.butiranKerja}`).join('; ')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Tiada analisis tersedia.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal melakukan analisis AI. Sila semak sambungan atau API Key.";
  }
};
