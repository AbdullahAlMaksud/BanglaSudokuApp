import { baseTheme } from './baseTheme';
import { colors } from './colors.dark';

export const darkTheme = {
  ...baseTheme,
  colors,
} as const;
