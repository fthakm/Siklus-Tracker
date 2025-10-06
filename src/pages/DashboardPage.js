import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ProgressChart from "../components/charts/ProgressChart";
import AttendanceChart from "../components/charts/AttendanceChart";
import ScoreTrendChart from "../components/charts/ScoreTrendChart";
import LeaderboardList from "../components/leaderboard/LeaderboardList";
import { Typography, Tabs, Tab, Box } from "@mui/material";

/**
 * DashboardPage
 * - Menampilkan overview performa siswa melalui grafik, daftar siswa rajin, dan siswa terbaik bulanan
 * - Layout modern, rapi, responsif
 * - Tab di bawah (mobile first), berubah posisi otomatis di desktop
 */

export default function DashboardPage() {
  // state untuk tab aktif
  const [tabValue, setTabValue] = useState(0);

  // data dummy sementara (akan diganti Supabase)
  const attendanceLeaders = [
    { name: "Rafi", attendance: "98%" },
    { name: "Zahra", attendance: "95%" },
    { name: "Iqbal", attendance: "92%" },
    { name: "Sinta", attendance: "89%" },
    { name: "Doni", attendance: "87%" },
  ];

  const bestStudents = [
    { name: "Rafi", score: 95, month: "Oktober" },
    { name: "Zahra", score: 92, month: "Oktober" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Judul Halaman */}
      <Typography
        variant="h5"
        className="font-bold text-blue-600 text-center mb-4"
      >
        Dashboard Aktivitas Siswa
      </Typography>

      {/* Konten utama */}
      {tabValue === 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-md rounded-2xl border border-blue-100">
            <CardContent>
              <Typography variant="subtitle1" className="font-semibold mb-2">
                Tren Nilai
              </Typography>
              <ScoreTrendChart />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl border border-blue-100">
            <CardContent>
              <Typography variant="subtitle1" className="font-semibold mb-2">
                Kehadiran Bulanan
              </Typography>
              <AttendanceChart />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-md rounded-2xl border border-blue-100">
            <CardContent>
              <Typography variant="subtitle1" className="font-semibold mb-2">
                Progres Latihan
              </Typography>
              <ProgressChart />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tab kedua: daftar siswa paling rajin */}
      {tabValue === 1 && (
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-inner h-[500px] overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h6" className="font-semibold text-blue-600 mb-4">
            Siswa Paling Rajin
          </Typography>
          <ul className="divide-y">
            {attendanceLeaders.map((s, idx) => (
              <li
                key={idx}
                className="flex justify-between py-3 px-2 hover:bg-blue-50 rounded-md transition-all"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-blue-600 font-semibold">
                  {s.attendance}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Tab ketiga: siswa terbaik bulan ini */}
      {tabValue === 2 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {bestStudents.map((s, idx) => (
            <Card
              key={idx}
              className="shadow-md rounded-2xl bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition"
            >
              <CardContent className="text-center py-8">
                <Typography
                  variant="h6"
                  className="font-bold text-blue-700 mb-2"
                >
                  🏆 {s.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Nilai Rata-rata: <b>{s.score}</b>
                </Typography>
                <Typography variant="body2" className="text-gray-500 mt-1">
                  Bulan {s.month}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Tab navigasi bawah */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          borderTop: "1px solid #e0e0e0",
          zIndex: 100,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(e, val) => setTabValue(val)}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Grafik" />
          <Tab label="Kehadiran" />
          <Tab label="Siswa Terbaik" />
        </Tabs>
      </Box>
    </div>
  );
      }
