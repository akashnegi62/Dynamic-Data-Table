"use client";

import {
  Box,
  Container,
  Stack,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setSearch } from "@/features/ui/uiSlice";
import { DataTable } from "@/components/DataTable";
import { ManageColumnsDialog } from "@/components/ManageColumnsDialog";
import { useRef, useState } from "react";
import Papa from "papaparse";
import { addRows } from "@/features/table/tableSlice";
import { addColumnIfMissing } from "@/features/columns/columnsSlice";
import { exportVisibleCsv } from "@/lib/exportCsv";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Page() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((s) => s.ui.search);
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const onImport = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, errors }) => {
        if (errors?.length) {
          alert(
            `CSV errors: ${errors
              .slice(0, 3)
              .map((e) => e.message)
              .join("; ")}`
          );
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rows = (data as any[])
          .filter(Boolean)
          .map((r) => ({ id: crypto.randomUUID(), ...r }));
        const headers = Object.keys(rows[0] ?? {});
        headers.forEach((h) =>
          dispatch(addColumnIfMissing({ id: h, label: h }))
        );
        if (rows.length) dispatch(addRows(rows));
      },
      error: (e) => alert(`Parse error: ${e.message}`),
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={{ xs: 2, sm: 2, md: 3 }}
      >
        <Typography variant={isXs ? "h6" : "h5"}>Dynamic Data Table</Typography>
        <ThemeToggle />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1.5, md: 2 }}
        alignItems={{ xs: "stretch", md: "center" }}
        mb={{ xs: 1.5, md: 2 }}
      >
        <TextField
          label="Search all fields"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          size={isXs ? "small" : "medium"}
          fullWidth
        />

        <input
          type="file"
          accept=".csv,text/csv"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImport(f);
            if (fileRef.current) fileRef.current.value = "";
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, md: 2 }}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            onClick={() => fileRef.current?.click()}
            fullWidth={isXs}
            sx={{ minWidth: { md: 160 }, whiteSpace: "nowrap" }}
          >
            Import CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => exportVisibleCsv()}
            fullWidth={isXs}
            sx={{ minWidth: { md: 160 }, whiteSpace: "nowrap" }}
          >
            Export CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<ViewWeekIcon />}
            onClick={() => setOpen(true)}
            fullWidth={isXs}
            sx={{ minWidth: { md: 180 }, whiteSpace: "nowrap" }}
          >
            Manage Columns
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <DataTable />
      </Box>

      <ManageColumnsDialog open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
