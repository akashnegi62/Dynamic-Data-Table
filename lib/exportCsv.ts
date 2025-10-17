import { saveAs } from "file-saver";
import { store } from "./store";

export function exportVisibleCsv(filename = "table.csv") {
  const state = store.getState();
  const cols = [...state.columns.items]
    .sort((a, b) => a.order - b.order)
    .filter((c) => c.visible);
  const rows = state.table.rows;

  const header = cols.map((c) => c.label);
  const lines = rows.map((r) =>
    cols
      .map((c) => {
        const val = r[c.id] ?? "";
        const s = String(val).replace(/"/g, '""');
        return `"${s}"`;
      })
      .join(",")
  );

  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}
