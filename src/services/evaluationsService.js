import supabase from "./supabaseClient";
const TABLE = "evaluations";

/**
 * Service untuk data evaluasi & ringkasan per siswa
 */

export async function getEvaluations() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*, student_id, category_id")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveEvaluation(payload) {
  const { id, ...rest } = payload;
  const query = id
    ? supabase.from(TABLE).update(rest).eq("id", id).select().single()
    : supabase.from(TABLE).insert([rest]).select().single();

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function deleteEvaluation(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function getEvaluasiSummary(month = "all") {
  let query = supabase
    .from(TABLE)
    .select("student_id, score, students(full_name)")
    .leftJoin("students", { student_id: "id" });

  if (month !== "all") {
    query = query.eq("month", month);
  }

  const { data, error } = await query;
  if (error) throw error;

  // hitung rata-rata skor per siswa
  const summary = Object.values(
    data.reduce((acc, row) => {
      const name = row.students?.full_name || "Tidak Diketahui";
      if (!acc[name]) acc[name] = { name, total: 0, count: 0 };
      acc[name].total += row.score || 0;
      acc[name].count++;
      return acc;
    }, {})
  ).map((s) => ({
    ...s,
    averageScore: s.count ? s.total / s.count : 0,
  }));

  return summary;
}
