import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Column = {
  id: string; // field key in row
  label: string; // header text
  visible: boolean; // checkbox controls this
  order: number; // for display order
  type?: "text" | "number";
};

type ColumnsState = { items: Column[] };

const defaultColumns: Column[] = [
  { id: "Name", label: "Name", visible: true, order: 0, type: "text" },
  { id: "Email", label: "Email", visible: true, order: 1, type: "text" },
  { id: "Age", label: "Age", visible: true, order: 2, type: "number" },
  { id: "Role", label: "Role", visible: true, order: 3, type: "text" },
];

const slice = createSlice({
  name: "columns",
  initialState: { items: defaultColumns } as ColumnsState,
  reducers: {
    toggleVisibility(
      state,
      action: PayloadAction<{ id: string; visible: boolean }>
    ) {
      const c = state.items.find((c) => c.id === action.payload.id);
      if (c) c.visible = action.payload.visible;
    },
    addColumn(
      state,
      action: PayloadAction<{
        id: string;
        label: string;
        type?: "text" | "number";
      }>
    ) {
      const exists = state.items.some((c) => c.id === action.payload.id);
      if (!exists)
        state.items.push({
          id: action.payload.id,
          label: action.payload.label,
          type: action.payload.type ?? "text",
          visible: true,
          order: state.items.length,
        });
    },
    addColumnIfMissing(
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) {
      const exists = state.items.some((c) => c.id === action.payload.id);
      if (!exists)
        state.items.push({
          id: action.payload.id,
          label: action.payload.label,
          visible: true,
          order: state.items.length,
          type: "text",
        });
    },
    reorderColumns(state, action: PayloadAction<{ from: number; to: number }>) {
      const items = [...state.items].sort((a, b) => a.order - b.order);
      const [moved] = items.splice(action.payload.from, 1);
      items.splice(action.payload.to, 0, moved);
      items.forEach((c, i) => (c.order = i));
      state.items = items;
    },
    setColumns(state, action: PayloadAction<Column[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  toggleVisibility,
  addColumn,
  addColumnIfMissing,
  reorderColumns,
  setColumns,
} = slice.actions;
export default slice.reducer;
