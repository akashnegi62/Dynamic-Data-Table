"use client";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { toggleTheme } from "@/features/ui/uiSlice";

export function ThemeToggle() {
  const mode = useAppSelector((s) => s.ui.theme);
  const dispatch = useAppDispatch();
  return (
    <Tooltip title="Toggle theme">
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        aria-label="Toggle theme"
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
