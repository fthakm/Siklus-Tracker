import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getMonthlyScoreTrends } from "../../services/leaderboardService";
import { Card, CardContent, Typography } from "@mui/material";

export default function ScoreTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMonthlyScoreTrends();
        const formatted = res.map((r) => ({
          month: `${r.month}/${r.year}`,
          score: r.score_avg || 0,
        }));
        setData(formatted);
      } catch (err) {
        console.error("Gagal memuat tren skor:", err);
      }
    };
    load();
  }, []);

  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent>
        <Typography variant="h6" className="text-blue-600 mb-3 font-semibold">
          Tren Skor Bulanan
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Area type="monotone" dataKey="score" stroke="#2196f3" fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
    }
