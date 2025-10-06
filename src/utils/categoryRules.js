/**
 * categoryRules.js
 * -----------------------------------
 * Aturan otomatis pengkategorian latihan berdasarkan nama gerakan.
 * Contoh: "push up" -> kekuatan, "lari cepat" -> kecepatan.
 * Bisa dikombinasikan dengan satuan (rep, detik, cm, meter, level).
 */

const categoryKeywords = {
  kecepatan: [
    "lari cepat",
    "sprint",
    "dash",
    "lari 100m",
    "lari 200m",
    "shuttle run",
    "speed run",
  ],
  kekuatan: [
    "push up",
    "sit up",
    "pull up",
    "squat",
    "plank",
    "angkat beban",
    "burpee",
    "push-up",
    "leg raises",
    "mountain climber",
    "russian twist",
    "toe touch",
  ],
  kelincahan: [
    "zigzag",
    "cone drill",
    "ladder drill",
    "agility",
    "side step",
    "box jump",
    "shuffle",
    "jugling",
  ],
  daya_tahan: [
    "lari jauh",
    "jogging",
    "yoyo test",
    "beep test",
    "cooper test",
    "endurance run",
  ],
  kelenturan: [
    "stretching",
    "split",
    "toe touch",
    "yoga",
    "bending",
    "flexibility",
  ],
  keseimbangan: [
    "balance",
    "one leg stand",
    "bosu ball",
    "stork stand",
    "stability",
  ],
};

/**
 * Fungsi untuk menentukan kategori otomatis berdasarkan nama latihan.
 * Jika tidak ditemukan, dikembalikan 'lainnya'.
 */
export function detectCategory(exerciseName = "") {
  const name = exerciseName.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => name.includes(kw))) {
      return category;
    }
  }
  return "lainnya";
}

/**
 * Fungsi untuk menentukan satuan default berdasarkan nama latihan
 */
export function detectUnit(exerciseName = "") {
  const name = exerciseName.toLowerCase();
  if (name.includes("lari") || name.includes("sprint")) return "detik";
  if (name.includes("push") || name.includes("sit") || name.includes("pull")) return "rep";
  if (name.includes("loncat") || name.includes("jump")) return "cm";
  if (name.includes("level")) return "level";
  return "rep";
}
