import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

interface CardProps extends ViewProps {
  variant?: "elevated" | "flat" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  variant = "elevated",
  padding = "md",
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getCardStyle = () => ({
    backgroundColor:
      variant === "outlined" ? "transparent" : theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: variant === "outlined" ? 1 : 0,
    borderColor: theme.colors.border,
    padding: theme.spacing[padding === "none" ? "xs" : padding],
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: variant === "elevated" ? 0.1 : 0,
    shadowRadius: 12,
    elevation: variant === "elevated" ? 4 : 0,
  });

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
};
