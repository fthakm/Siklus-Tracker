import supabase from "./supabaseClient";
const TABLE = "students";

/**
 * Layanan untuk data siswa:
 * CRUD + helper untuk mengambil hasil & evaluasi
 */

export async function getStudents() {
  const { data, error } = await supabase.from(TABLE).select("*").order("full_name");
  if (error) throw error;
  return data;
}

export async function saveStudent(payload) {
  const { id, ...rest } = payload;
  const query = id
    ? supabase.from(TABLE).update(rest).eq("id", id).select().single()
    : supabase.from(TABLE).insert([rest]).select().single();

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function deleteStudent(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
  return data;
}

export async function getResultsByStudent(studentId) {
  const { data, error } = await supabase
    .from("student_results")
    .select("category_id, score_avg, attendance_count, month, year")
    .eq("student_id", studentId)
    .order("year", { ascending: false });
  if (error) throw error;
  return data;
}
// Hapus siswa
export async function deleteStudent(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
  return true;
}
