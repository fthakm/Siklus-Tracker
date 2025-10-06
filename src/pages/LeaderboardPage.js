import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Chip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getLeaderboard } from "../services/leaderboardService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

/**
 * Halaman Leaderboard
 * - Menampilkan peringkat siswa berdasarkan skor rata-rata
 * - Ada filter kategori (kekuatan, kelincahan, dll)
 * - Badge visual untuk 3 besar
 * - Warna biru lembut modern (#E3F2FD)
 */

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(category);
        setLeaderboard(data);
      } catch (err) {
        console.error("Gagal memuat leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, [category]);

  const getBadgeColor = (rank) => {
    if (rank === 1) return "#FFD700"; // emas
    if (rank === 2) return "#C0C0C0"; // perak
    if (rank === 3) return "#CD7F32"; // perunggu
    return "#E3F2FD"; // default
  };

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h5" className="font-bold text-blue-600">
        Leaderboard Siswa
      </Typography>

      <Paper className="p-4 rounded-xl shadow-sm bg-blue-50">
        <FormControl fullWidth size="small">
          <InputLabel>Kategori</InputLabel>
          <Select
            value={category}
            label="Kategori"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">Semua</MenuItem>
            <MenuItem value="kecepatan">Kecepatan</MenuItem>
            <MenuItem value="kekuatan">Kekuatan</MenuItem>
            <MenuItem value="kelincahan">Kelincahan</MenuItem>
            <MenuItem value="daya_tahan">Daya Tahan</MenuItem>
            <MenuItem value="kelenturan">Kelenturan</MenuItem>
            <MenuItem value="keseimbangan">Keseimbangan</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {loading ? (
        <LoadingSpinner />
      ) : leaderboard.length === 0 ? (
        <Typography align="center" color="textSecondary">
          Belum ada data leaderboard.
        </Typography>
      ) : (
        <Box className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leaderboard.map((s, index) => (
            <Paper
              key={s.id}
              className="p-4 rounded-xl shadow-md flex items-center gap-4 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: getBadgeColor(index + 1),
                border:
                  index + 1 <= 3
                    ? "2px solid rgba(0,0,0,0.1)"
                    : "1px solid #e0e0e0",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#90CAF9",
                  color: "#fff",
                  width: 56,
                  height: 56,
                  fontSize: "1.2rem",
                }}
              >
                {index + 1}
              </Avatar>

              <Box className="flex-1">
                <Typography
                  variant="subtitle1"
                  className="font-semibold text-gray-800"
                >
                  {s.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Nilai Rata-rata: <b>{s.average_score?.toFixed(1) || "-"}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Kehadiran: <b>{s.attendance_rate || 0}%</b>
                </Typography>
              </Box>

              {index + 1 <= 3 && (
                <Chip
                  icon={<EmojiEventsIcon />}
                  label={
                    index + 1 === 1
                      ? "Juara 1"
                      : index + 1 === 2
                      ? "Juara 2"
                      : "Juara 3"
                  }
                  color="warning"
                  sx={{ fontWeight: "bold" }}
                />
              )}
            </Paper>
          ))}
        </Box>
      )}
    </div>
  );
}
