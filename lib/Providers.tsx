"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useAppSelector } from "./store";

// Inner ThemeProvider that reads Redux theme only after mount
function ThemeBridgeInner({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((s) => s.ui.theme);
  const theme = createTheme({ palette: { mode } });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

// Outer Providers render a stable 'light' theme until mounted to avoid SSR/CSR mismatch
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ssrTheme = createTheme({ palette: { mode: "light" } });

  return (
    <Provider store={store}>
      {mounted ? (
        <ThemeBridgeInner>{children}</ThemeBridgeInner>
      ) : (
        <ThemeProvider theme={ssrTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      )}
    </Provider>
  );
}
