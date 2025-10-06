/**
 * formatters.js
 * -----------------------------------
 * Utilitas pemformatan umum untuk tanggal, angka, dan teks.
 */

/**
 * Format tanggal menjadi format lokal Indonesia
 */
export function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format nilai numerik menjadi dua desimal
 */
export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return "-";
  return Number(num).toFixed(2);
}

/**
 * Format nama agar huruf awal kapital di setiap kata
 */
export function formatName(name = "") {
  return name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Format kategori agar tampil rapi
 */
export function formatCategory(cat = "") {
  const map = {
    kecepatan: "Kecepatan",
    kekuatan: "Kekuatan",
    kelincahan: "Kelincahan",
    daya_tahan: "Daya Tahan",
    kelenturan: "Kelenturan",
    keseimbangan: "Keseimbangan",
    lainnya: "Lainnya",
  };
  return map[cat] || cat;
}
