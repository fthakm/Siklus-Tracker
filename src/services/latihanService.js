import supabase from "../supabaseClient";

const TABLE = "latihan_sessions";

// Semua sesi latihan
export async function getLatihanSessions() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*, session_participants(*)")
    .order("scheduled_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Tambah atau update sesi
export async function saveLatihanSession(payload) {
  if (!payload.id) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", payload.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

// Hapus sesi latihan
export async function deleteLatihanSession(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
  return true;
}

// Ringkasan latihan per sesi
export async function getLatihanSummary(sessionId) {
  const { data, error } = await supabase
    .from("evaluations")
    .select("student_id, score, attendance")
    .eq("session_id", sessionId);
  if (error) throw error;
  return data;
}
