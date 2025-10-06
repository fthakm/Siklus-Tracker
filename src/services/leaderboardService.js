import supabase from "../supabaseClient";

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from("student_results")
    .select("students(full_name), score_avg")
    .order("score_avg", { ascending: false });
  if (error) throw error;

  return data.map((item, i) => ({
    rank: i + 1,
    name: item.students?.full_name,
    score: item.score_avg,
  }));
}
