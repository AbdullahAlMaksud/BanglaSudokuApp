// Re-export theming utilities from our React Context-based solution
// This replaces react-native-unistyles which requires native modules

export {
  ThemeProvider,
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
  useTheme,
  type AppTheme as UnistylesTheme,
} from "./ThemeContext";

export { breakpoints, darkTheme, lightTheme } from "./themes";
