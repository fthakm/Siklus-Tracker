import supabase from "./supabaseClient";
const TABLE = "latihan_sessions";

/**
 * Service untuk sesi latihan & ringkasan hasil
 */

export async function getLatihanSessions() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*, category_id")
    .order("scheduled_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveLatihanSession(payload) {
  const { id, ...rest } = payload;
  const query = id
    ? supabase.from(TABLE).update(rest).eq("id", id).select().single()
    : supabase.from(TABLE).insert([rest]).select().single();
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function deleteLatihanSession(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function getLatihanSummary(sessionId) {
  const { data, error } = await supabase
    .from("evaluations")
    .select("student_id, score, attendance")
    .eq("session_id", sessionId);
  if (error) throw error;
  return data;
}
