import React, { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Collapse,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Edit,
  Delete,
  Info,
  PersonAdd,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import StudentFilterBar from "../components/students/StudentFilterBar";
import { getStudents, deleteStudent } from "../services/studentService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import StudentCard from "../components/students/StudentCard";

/**
 * SiswaPage
 * - Menampilkan daftar siswa lengkap dengan search, filter usia, pagination
 * - Collapse untuk biodata
 * - Aksi: Detail (dengan grafik), Edit, Delete
 * - Desain modern, warna biru muda sesuai tema
 */

export default function SiswaPage() {
  const [students, setStudents] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [filterAge, setFilterAge] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Load data siswa
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        console.error("Gagal memuat siswa:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  // Filter dan pencarian
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesAge =
      filterAge === "all" || (s.age && s.age.toString() === filterAge);
    return matchesSearch && matchesAge;
  });

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(deleteId);
      setStudents(students.filter((s) => s.id !== deleteId));
    } catch (err) {
      console.error("Gagal menghapus:", err);
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Box className="flex justify-between items-center">
        <Typography variant="h5" className="font-bold text-blue-600">
          Daftar Siswa
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          sx={{ borderRadius: "12px", backgroundColor: "#2196f3" }}
        >
          Tambah Siswa
        </Button>
      </Box>

      {/* Filter Bar */}
      <StudentFilterBar
        search={search}
        setSearch={setSearch}
        filterAge={filterAge}
        setFilterAge={setFilterAge}
      />

      {/* Table siswa */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Paper className="shadow-md rounded-2xl overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#E3F2FD" }}>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Usia</TableCell>
                  <TableCell>Kelas</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((s) => (
                    <React.Fragment key={s.id}>
                      <TableRow
                        hover
                        sx={{ "&:hover": { backgroundColor: "#f9fbff" } }}
                      >
                        <TableCell>
                          <Box className="flex items-center">
                            <IconButton size="small" onClick={() => handleExpand(s.id)}>
                              {expanded === s.id ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                            <Typography noWrap className="font-medium ml-1">
                              {s.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{s.age || "-"}</TableCell>
                        <TableCell>{s.class || "-"}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => setSelectedStudent(s)}
                          >
                            <Info />
                          </IconButton>
                          <IconButton color="secondary">
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(s.id);
                              setConfirmOpen(true);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>

                      {/* Biodata collapse */}
                      <TableRow>
                        <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                          <Collapse in={expanded === s.id} timeout="auto" unmountOnExit>
                            <Box margin={2} className="bg-blue-50 rounded-lg p-3">
                              <Typography variant="body2">
                                <b>Alamat:</b> {s.address || "—"}
                              </Typography>
                              <Typography variant="body2">
                                <b>Jenis Kelamin:</b> {s.gender || "—"}
                              </Typography>
                              <Typography variant="body2">
                                <b>Email:</b> {s.email || "—"}
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredStudents.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      )}

      {/* Detail modal (StudentCard) */}
      {selectedStudent && (
        <StudentCard
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Dialog konfirmasi hapus */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Siswa"
        message="Apakah kamu yakin ingin menghapus data siswa ini?"
      />
    </div>
  );
      }
