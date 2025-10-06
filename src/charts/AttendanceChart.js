import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getEvaluationAttendanceStats } from "../../services/evaluationsService";
import { Card, CardContent, Typography } from "@mui/material";

const COLORS = ["#4CAF50", "#f44336"]; // hijau hadir, merah absen

export default function AttendanceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await getEvaluationAttendanceStats();
        setData([
          { name: "Hadir", value: stats.present || 0 },
          { name: "Tidak Hadir", value: stats.absent || 0 },
        ]);
      } catch (err) {
        console.error("Gagal memuat statistik kehadiran:", err);
      }
    };
    loadData();
  }, []);

  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent>
        <Typography variant="h6" className="text-blue-600 mb-3 font-semibold">
          Persentase Kehadiran
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
  }
