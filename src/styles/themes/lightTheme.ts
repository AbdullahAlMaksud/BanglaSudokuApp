import { baseTheme } from './baseTheme';
import { colors } from './colors.light';

export const lightTheme = {
  ...baseTheme,
  colors,
} as const;
