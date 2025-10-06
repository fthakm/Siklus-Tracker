import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllCategories } from "../../services/categoryService";
import { getStudentResults } from "../../services/leaderboardService"; // asumsi pakai hasil agregat
import { Card, CardContent, Typography } from "@mui/material";

export default function ProgressChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const results = await getStudentResults(); // ambil data rata-rata
        const formatted = results.map((r) => ({
          category: r.category_name || "Tidak Diketahui",
          score: r.score_avg || 0,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Gagal memuat data grafik progres:", err);
      }
    };
    loadData();
  }, []);

  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent>
        <Typography variant="h6" className="text-blue-600 mb-3 font-semibold">
          Tren Skor per Kategori
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#2196f3" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
    }
