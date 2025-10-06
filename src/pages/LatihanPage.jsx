import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { motion } from "framer-motion";
import { getLatihanSessions, saveLatihanSession } from "../services/latihanService";
import { getStudents } from "../services/studentService";
import { categorizeExercise } from "../utils/categoryRules";
import { exportLatihanToExcel } from "../utils/exportExcel";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

/**
 * Halaman Latihan
 * - Tab 1: Tambah sesi latihan (pilih tanggal, siswa, input nilai)
 * - Tab 2: Lihat riwayat sesi latihan
 * - Otomatis kehadiran (input nilai = hadir)
 * - Export hasil ke Excel
 */

export default function LatihanPage() {
  const [tab, setTab] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [unit, setUnit] = useState("rep");
  const [values, setValues] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });

  // Load data awal
  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [sessionData, studentData] = await Promise.all([
          getLatihanSessions(),
          getStudents(),
        ]);
        setSessions(sessionData);
        setStudents(studentData);
      } catch (err) {
        console.error("Gagal memuat data latihan:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const handleInputChange = (studentId, value) => {
    setValues({ ...values, [studentId]: value });
  };

  const handleSaveSession = async () => {
    if (!selectedDate || !exerciseName) {
      setAlert({ open: true, message: "Isi semua data terlebih dahulu!", type: "error" });
      return;
    }

    const category = categorizeExercise(exerciseName, unit);

    const payload = {
      scheduled_at: selectedDate,
      exercise_name: exerciseName,
      unit,
      category,
      results: students.map((s) => ({
        student_id: s.id,
        value: values[s.id] || null,
        attendance: values[s.id] ? true : false,
      })),
    };

    try {
      await saveLatihanSession(payload);
      setAlert({ open: true, message: "Sesi latihan berhasil disimpan!", type: "success" });
      setSelectedDate("");
      setExerciseName("");
      setValues({});
    } catch (err) {
      console.error("Gagal menyimpan sesi:", err);
      setAlert({ open: true, message: "Gagal menyimpan sesi latihan!", type: "error" });
    }
  };

  const handleExport = () => {
    exportLatihanToExcel(sessions);
  };

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h5" className="font-bold text-blue-600">
        Latihan Siswa
      </Typography>

      <Paper className="p-3 rounded-xl shadow-sm">
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="Tambah Sesi Latihan" />
          <Tab label="Riwayat Latihan" />
        </Tabs>
      </Paper>

      {/* TAB 1: Tambah Sesi Latihan */}
      {tab === 0 && (
        <Paper className="p-5 rounded-xl shadow-md space-y-4 bg-blue-50">
          <Typography variant="subtitle1" className="font-semibold">
            Buat Sesi Latihan Baru
          </Typography>

          <Box className="grid md:grid-cols-3 gap-4">
            <TextField
              type="date"
              label="Tanggal"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Nama Latihan / Gerakan"
              placeholder="Contoh: Push Up, Shuttle Run"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Satuan</InputLabel>
              <Select
                value={unit}
                label="Satuan"
                onChange={(e) => setUnit(e.target.value)}
              >
                <MenuItem value="rep">Repetisi (rep)</MenuItem>
                <MenuItem value="detik">Detik</MenuItem>
                <MenuItem value="cm">Centimeter</MenuItem>
                <MenuItem value="meter">Meter</MenuItem>
                <MenuItem value="level">Level</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="subtitle2" className="mt-4 font-medium text-gray-600">
            Masukkan nilai latihan untuk setiap siswa:
          </Typography>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <TableContainer component={Paper} className="shadow-md rounded-lg">
              <Table>
                <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableRow>
                    <TableCell>Nama</TableCell>
                    <TableCell align="center">Nilai</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell align="center">
                        <TextField
                          size="small"
                          type="number"
                          value={values[s.id] || ""}
                          onChange={(e) => handleInputChange(s.id, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleSaveSession}
            sx={{ mt: 3, borderRadius: "12px", backgroundColor: "#2196f3" }}
          >
            Simpan Sesi
          </Button>
        </Paper>
      )}

      {/* TAB 2: Riwayat Latihan */}
      {tab === 1 && (
        <Paper className="p-5 rounded-xl shadow-md bg-white">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="subtitle1" className="font-semibold">
              Riwayat Sesi Latihan
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
            >
              Export Excel
            </Button>
          </Box>

          {loading ? (
            <LoadingSpinner />
          ) : sessions.length === 0 ? (
            <Typography align="center" color="textSecondary">
              Belum ada sesi latihan.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Nama Latihan</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell>Satuan</TableCell>
                    <TableCell>Jumlah Peserta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sessions.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.scheduled_at}</TableCell>
                      <TableCell>{s.exercise_name}</TableCell>
                      <TableCell>{s.category}</TableCell>
                      <TableCell>{s.unit}</TableCell>
                      <TableCell>{s.results?.length || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}

      {/* Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.type}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
                      }
