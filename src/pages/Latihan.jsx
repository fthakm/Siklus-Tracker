import React, { useState } from "react";
import { Button, Tabs, Tab } from "@mui/material";

export default function Latihan() {
  const [tab, setTab] = useState(0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Sesi Latihan</h1>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
        <Tab label="Tambah Sesi" />
        <Tab label="Riwayat Latihan" />
      </Tabs>

      {tab === 0 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <Button variant="contained" color="primary">
            + Buat Sesi Latihan
          </Button>
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Daftar sesi latihan akan tampil di sini.</p>
        </div>
      )}
    </div>
  );
}
