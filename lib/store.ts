"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import table from "@/features/table/tableSlice";
import columns from "@/features/columns/columnsSlice";
import ui from "@/features/ui/uiSlice";

export const store = configureStore({
  reducer: { table, columns, ui },
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      localStorage.setItem(
        "persist:columns",
        JSON.stringify(store.getState().columns)
      );
    } catch {}
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
