import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { useSettingsStore } from "../store/settingsStore";
import { darkTheme, lightTheme } from "./themes";

export type AppTheme = typeof lightTheme | typeof darkTheme;

interface ThemeContextValue {
  theme: AppTheme;
  themeName: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeName: "light",
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const themeMode = useSettingsStore((s) => s.theme);

  const value = useMemo(() => {
    let resolvedThemeName: "light" | "dark";
    if (themeMode === "system") {
      resolvedThemeName = systemScheme === "dark" ? "dark" : "light";
    } else {
      resolvedThemeName = themeMode;
    }

    return {
      theme: resolvedThemeName === "dark" ? darkTheme : lightTheme,
      themeName: resolvedThemeName,
    };
  }, [themeMode, systemScheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Compatibility exports for react-native-unistyles replacement
export function useStyles<T>(stylesheet: (theme: AppTheme) => T): {
  styles: T;
  theme: AppTheme;
} {
  const { theme } = useTheme();
  const styles = useMemo(() => stylesheet(theme), [theme, stylesheet]);
  return { styles, theme };
}

export function createStyleSheet<T>(
  stylesheet: (theme: AppTheme) => T,
): (theme: AppTheme) => T {
  return stylesheet;
}

// UnistylesRuntime compatibility shim
export const UnistylesRuntime = {
  getTheme: () => lightTheme, // This will be overridden by actual context usage
};
