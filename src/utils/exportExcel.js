/**
 * exportExcel.js
 * -----------------------------------
 * Utilitas untuk mengekspor data evaluasi atau latihan ke format Excel (.xlsx)
 * Menggunakan SheetJS (xlsx)
 */

import * as XLSX from "xlsx";

/**
 * Ekspor data ke Excel
 * @param {Array} data - array objek data yang akan diekspor
 * @param {string} filename - nama file output (tanpa ekstensi)
 */
export function exportToExcel(data, filename = "export_data") {
  try {
    if (!data || data.length === 0) {
      console.warn("Tidak ada data untuk diekspor");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${filename}.xlsx`);

    console.log(`✅ File ${filename}.xlsx berhasil dibuat!`);
  } catch (error) {
    console.error("❌ Gagal mengekspor ke Excel:", error);
  }
}
