import supabase from "../supabaseClient";

const TABLE = "evaluations";

export async function getEvaluasiSummary(month = "all") {
  let query = supabase
    .from(TABLE)
    .select("student_id, score, attendance, created_at, students(full_name)");

  if (month !== "all") {
    query = query.filter("extract(month from created_at)", "eq", month);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Hitung rata-rata
  const grouped = {};
  data.forEach((item) => {
    const name = item.students?.full_name || "Unknown";
    if (!grouped[name]) grouped[name] = { total: 0, count: 0 };
    grouped[name].total += item.score || 0;
    grouped[name].count++;
  });

  return Object.entries(grouped).map(([name, val]) => ({
    name,
    averageScore: (val.total / val.count).toFixed(2),
  }));
}
