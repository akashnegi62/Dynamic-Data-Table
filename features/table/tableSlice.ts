import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Row = {
  id: string;
  Name: string;
  Email: string;
  Age: number | string;
  Role: string;
  [key: string]: string | number;
};

// Use deterministic IDs to keep SSR and CSR consistent
const initialRows: Row[] = [
  {
    id: "row-1",
    Name: "Alice",
    Email: "alice@example.com",
    Age: 29,
    Role: "Engineer",
  },
  {
    id: "row-2",
    Name: "Bob",
    Email: "bob@example.com",
    Age: 35,
    Role: "Manager",
  },
  {
    id: "row-3",
    Name: "Cara",
    Email: "cara@example.com",
    Age: 26,
    Role: "Designer",
  },
];

type TableState = { rows: Row[] };

const slice = createSlice({
  name: "table",
  initialState: { rows: initialRows } as TableState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) {
      state.rows = action.payload;
    },
    addRows(state, action: PayloadAction<Row[]>) {
      state.rows.push(...action.payload);
    },
    updateRow(
      state,
      action: PayloadAction<{ id: string; patch: Partial<Row> }>
    ) {
      const i = state.rows.findIndex((r) => r.id === action.payload.id);
      if (i >= 0) state.rows[i] = { ...state.rows[i], ...action.payload.patch };
    },
    deleteRow(state, action: PayloadAction<{ id: string }>) {
      state.rows = state.rows.filter((r) => r.id !== action.payload.id);
    },
  },
});

export const { setRows, addRows, updateRow, deleteRow } = slice.actions;
export default slice.reducer;
