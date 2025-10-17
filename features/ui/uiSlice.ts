import { createSlice } from "@reduxjs/toolkit";

type SortDir = "asc" | "desc" | null;

type UIState = {
  search: string;
  sortField: string | null;
  sortDir: SortDir;
  page: number;
  pageSize: number;
  theme: "light" | "dark";
};

// Stable, deterministic defaults so SSR === CSR initially
const initialState: UIState = {
  search: "",
  sortField: null,
  sortDir: null,
  page: 0,
  pageSize: 10,
  theme: "light",
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch: (s, a: { payload: string }) => {
      s.search = a.payload;
      s.page = 0;
    },
    setSort: (s, a: { payload: { field: string } }) => {
      if (s.sortField === a.payload.field) {
        s.sortDir =
          s.sortDir === "asc" ? "desc" : s.sortDir === "desc" ? null : "asc";
      } else {
        s.sortField = a.payload.field;
        s.sortDir = "asc";
      }
    },
    setPage: (s, a: { payload: number }) => {
      s.page = a.payload;
    },
    setPageSize: (s, a: { payload: number }) => {
      s.pageSize = a.payload;
      s.page = 0;
    },
    toggleTheme: (s) => {
      s.theme = s.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setSearch, setSort, setPage, setPageSize, toggleTheme } =
  slice.actions;
export default slice.reducer;
