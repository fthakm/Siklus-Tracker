import React from "react";

export default function Leaderboard() {
  const data = [
    { name: "Rafi", score: 95 },
    { name: "Sinta", score: 89 },
    { name: "Bagas", score: 84 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Leaderboard</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Peringkat</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Nilai</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => (
              <tr key={i} className="border-b hover:bg-blue-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3 font-semibold text-blue-700">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
