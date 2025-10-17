"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setPage, setSort } from "@/features/ui/uiSlice";
import { deleteRow } from "@/features/table/tableSlice";
import { useMemo } from "react";

type Dir = "asc" | "desc" | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applySearch(rows: any[], term: string) {
  if (!term) return rows;
  const t = term.toLowerCase();
  return rows.filter((r) =>
    Object.values(r).some((v) => String(v).toLowerCase().includes(t))
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applySort(rows: any[], field: string | null, dir: Dir) {
  if (!field || !dir) return rows;
  const sorted = [...rows].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    const an = Number(av);
    const bn = Number(bv);
    const bothNum = !Number.isNaN(an) && !Number.isNaN(bn);
    const cmp = bothNum
      ? an - bn
      : String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
          sensitivity: "base",
          numeric: true,
        });
    return dir === "asc" ? cmp : -cmp;
  });
  return sorted;
}

export function DataTable() {
  const dispatch = useAppDispatch();
  const { rows } = useAppSelector((s) => s.table);
  const allColumns = useAppSelector((s) => s.columns.items);
  const columns = useMemo(
    () =>
      [...allColumns]
        .sort((a, b) => a.order - b.order)
        .filter((c) => c.visible),
    [allColumns]
  );
  const { page, pageSize, sortField, sortDir, search } = useAppSelector(
    (s) => s.ui
  );

  const filtered = useMemo(() => applySearch(rows, search), [rows, search]);
  const sorted = useMemo(
    () => applySort(filtered, sortField, sortDir),
    [filtered, sortField, sortDir]
  );
  const paged = useMemo(
    () => sorted.slice(page * pageSize, page * pageSize + pageSize),
    [sorted, page, pageSize]
  );

  const handleChangePage = (_: unknown, newPage: number) =>
    dispatch(setPage(newPage));

  return (
    <Paper elevation={0}>
      <TableContainer
        component={Box}
        sx={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Table size="small" aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sortDirection={sortField === col.id ? sortDir : false}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  <TableSortLabel
                    active={sortField === col.id}
                    direction={
                      sortField === col.id && sortDir ? sortDir : "asc"
                    }
                    onClick={() => dispatch(setSort({ field: col.id }))}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paged.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col.id}>{row[col.id] ?? ""}</TableCell>
                ))}
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    <IconButton
                      size="small"
                      color="error"
                      aria-label="delete row"
                      onClick={() => dispatch(deleteRow({ id: row.id }))}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[10]}
        labelRowsPerPage=""
      />
    </Paper>
  );
}
