
import { GoogleGenAI } from "@google/genai";
import { MaintenanceReport } from "../types";

export const analyzeReport = async (report: MaintenanceReport): Promise<string> => {
  // // Fix: Initialize GoogleGenAI strictly using the process.env.API_KEY variable as per GenAI coding guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
    // // Fix: Ensure the .text property is accessed directly as per the latest SDK requirements.
    return response.text || "Tiada analisis tersedia.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal melakukan analisis AI.";
  }
};
