import supabase from "../supabaseClient";

const TABLE = "students";

// Ambil semua siswa
export async function getStudents() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Simpan siswa baru
export async function saveStudent(student) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([student])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update siswa
export async function updateStudent(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Hapus siswa
export async function deleteStudent(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
  return true;
}
