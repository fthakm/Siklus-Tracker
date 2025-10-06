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
import { getStudents } from "../services/studentService";
import { saveEvaluasiSession, getEvaluasiSummary } from "../services/evaluationsService";
import { categorizeExercise } from "../utils/categoryRules";
import { exportEvaluasiToExcel } from "../utils/exportExcel";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

/**
 * Halaman Evaluasi
 * - Tab 1: Input evaluasi per siswa (materi banyak)
 * - Tab 2: Riwayat hasil evaluasi + export Excel
 */

export default function EvaluasiPage() {
  const [tab, setTab] = useState(0);
  const [students, setStudents] = useState([]);
  const [evaluasiData, setEvaluasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [unit, setUnit] = useState("rep");
  const [values, setValues] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        const summary = await getEvaluasiSummary(selectedMonth);
        setEvaluasiData(summary);
      } catch (err) {
        console.error("Gagal memuat data evaluasi:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedMonth]);

  const handleInputChange = (studentId, value) => {
    setValues({ ...values, [studentId]: value });
  };

  const handleSaveEvaluasi = async () => {
    if (!selectedDate || !exerciseName) {
      setAlert({ open: true, message: "Isi semua data terlebih dahulu!", type: "error" });
      return;
    }

    const category = categorizeExercise(exerciseName, unit);

    const payload = {
      date: selectedDate,
      exercise_name: exerciseName,
      unit,
      category,
      results: students.map((s) => ({
        student_id: s.id,
        score: values[s.id] || null,
        attendance: values[s.id] ? true : false,
      })),
    };

    try {
      await saveEvaluasiSession(payload);
      setAlert({ open: true, message: "Evaluasi berhasil disimpan!", type: "success" });
      setSelectedDate("");
      setExerciseName("");
      setValues({});
    } catch (err) {
      console.error("Gagal menyimpan evaluasi:", err);
      setAlert({ open: true, message: "Gagal menyimpan evaluasi!", type: "error" });
    }
  };

  const handleExport = () => {
    exportEvaluasiToExcel(evaluasiData);
  };

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h5" className="font-bold text-blue-600">
        Evaluasi Siswa
      </Typography>

      <Paper className="p-3 rounded-xl shadow-sm">
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="Input Evaluasi" />
          <Tab label="Riwayat Evaluasi" />
        </Tabs>
      </Paper>

      {/* TAB 1: Input Evaluasi */}
      {tab === 0 && (
        <Paper className="p-5 rounded-xl shadow-md space-y-4 bg-blue-50">
          <Typography variant="subtitle1" className="font-semibold">
            Tambah Data Evaluasi
          </Typography>

          <Box className="grid md:grid-cols-3 gap-4">
            <TextField
              type="date"
              label="Tanggal Evaluasi"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Nama Gerakan / Materi"
              placeholder="Contoh: Yoyo Test, Sit Up"
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
            Masukkan nilai evaluasi untuk setiap siswa:
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
            onClick={handleSaveEvaluasi}
            sx={{ mt: 3, borderRadius: "12px", backgroundColor: "#2196f3" }}
          >
            Simpan Evaluasi
          </Button>
        </Paper>
      )}

      {/* TAB 2: Riwayat Evaluasi */}
      {tab === 1 && (
        <Paper className="p-5 rounded-xl shadow-md bg-white">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="subtitle1" className="font-semibold">
              Riwayat Evaluasi
            </Typography>
            <Box className="flex gap-3">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Bulan</InputLabel>
                <Select
                  value={selectedMonth}
                  label="Bulan"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <MenuItem value="all">Semua</MenuItem>
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
              >
                Export Excel
              </Button>
            </Box>
          </Box>

          {loading ? (
            <LoadingSpinner />
          ) : evaluasiData.length === 0 ? (
            <Typography align="center" color="textSecondary">
              Belum ada data evaluasi.
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Nama Gerakan</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell>Nilai Rata-rata</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evaluasiData.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.date}</TableCell>
                      <TableCell>{e.exercise_name}</TableCell>
                      <TableCell>{e.category}</TableCell>
                      <TableCell>{e.averageScore || "-"}</TableCell>
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
