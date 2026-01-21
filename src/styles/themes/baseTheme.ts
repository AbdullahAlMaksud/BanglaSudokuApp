import { FONT_SIZES, FONT_SPACING } from './font';

export const baseTheme = {
  gap: (v: number) => v * 4,
  typography: {
    fontFamily: {
      regular: 'System',
      bold: 'System',
      // বাংলা ফন্ট পরে যোগ করা হবে
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
  },
  fontSizes: FONT_SIZES,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    ...FONT_SPACING,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  shadows: {
    xs: {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.0,
      elevation: 1,
    },
    sm: {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4.59,
      elevation: 2,
    },
    md: {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 8,
    },
    '2xl': {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 10,
    },
  },
} as const;
