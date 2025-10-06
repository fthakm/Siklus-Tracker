import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import StudentFilterBar from "../components/Students/StudentFilterBar";

export default function Students() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Daftar Siswa</h1>
      </div>

      <StudentFilterBar
        search={search}
        onSearchChange={setSearch}
        ageFilter={ageFilter}
        onAgeChange={setAgeFilter}
        onAddStudent={() => alert("Tambah siswa")}
      />

      <div className="bg-white p-4 rounded-xl shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Umur</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[{ name: "Rafi", age: 13 }, { name: "Sinta", age: 14 }].map((s, i) => (
              <tr key={i} className="hover:bg-blue-50 border-b">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.age}</td>
                <td className="p-3">
                  <Button variant="outlined" size="small">Detail</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
