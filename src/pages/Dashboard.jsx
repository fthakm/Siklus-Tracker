import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { bulan: "Jan", skor: 65 },
  { bulan: "Feb", skor: 70 },
  { bulan: "Mar", skor: 78 },
  { bulan: "Apr", skor: 82 },
  { bulan: "Mei", skor: 85 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Dashboard</h1>

      {/* Grafik Progres */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Tren Pencapaian Siswa
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="bulan" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="skor" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Box Siswa Rajin */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Siswa Paling Rajin
          </h2>
          <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
            {["Rafi", "Andi", "Sinta", "Dewi", "Bagas"].map((s, i) => (
              <li key={i} className="py-2 flex justify-between">
                <span>{s}</span>
                <span className="text-blue-600 font-semibold">{90 - i * 5}%</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Card Siswa Terbaik */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Siswa Terbaik Bulan Ini
          </h2>
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
            <div>
              <p className="font-bold text-blue-700 text-xl">Rafi Ramadhan</p>
              <p className="text-gray-600">Nilai Rata-rata: 92</p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="student"
              className="w-16 h-16"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
                  }
