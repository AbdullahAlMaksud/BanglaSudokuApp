import { ComponentType } from "react";
import { AppTheme, useTheme } from "../ThemeContext";

export type WithTheme<T = unknown> = T & {
  theme: AppTheme;
};

// Higher-order component that injects theme from context
export function withUniTheme<P extends WithTheme>(
  Component: ComponentType<P>,
): ComponentType<Omit<P, "theme">> {
  return function WithThemeWrapper(props: Omit<P, "theme">) {
    const { theme } = useTheme();
    return <Component {...(props as P)} theme={theme} />;
  };
}
