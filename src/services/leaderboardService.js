import supabase from "./supabaseClient";

/**
 * Leaderboard Service
 * - Ambil data agregasi dari student_results
 * - Bisa difilter berdasarkan kategori
 */

export async function getLeaderboard(category = "all") {
  let query = supabase
    .from("student_results")
    .select("student_id, students(full_name), category_id, score_avg, attendance_count")
    .leftJoin("students", { student_id: "id" })
    .order("score_avg", { ascending: false });

  if (category !== "all") {
    query = query.eq("category_id", category);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((r) => ({
    id: r.student_id,
    name: r.students?.full_name,
    average_score: r.score_avg,
    attendance_rate: r.attendance_count,
  }));
}
