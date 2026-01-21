import React from "react";
import { Platform, View, ViewProps } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

interface CardProps extends ViewProps {
  variant?: "elevated" | "flat" | "outlined" | "glow";
  padding?: "none" | "sm" | "md" | "lg";
  glowColor?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = "elevated",
  padding = "md",
  glowColor,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getCardStyle = () => {
    const baseStyle: any = {
      backgroundColor:
        variant === "outlined" ? "transparent" : theme.colors.surface,
      borderRadius: theme.radius.lg,
      borderWidth: variant === "outlined" ? 1 : 0,
      borderColor: theme.colors.border,
      padding: theme.spacing[padding === "none" ? "xs" : padding],
    };

    // Enhanced shadow/glow effects
    if (variant === "elevated") {
      if (Platform.OS === "ios") {
        baseStyle.shadowColor = theme.colors.text;
        baseStyle.shadowOffset = { width: 0, height: 4 };
        baseStyle.shadowOpacity = 0.08;
        baseStyle.shadowRadius = 12;
      } else {
        baseStyle.elevation = 4;
      }
    } else if (variant === "glow") {
      const glow = glowColor || theme.colors.primary;
      if (Platform.OS === "ios") {
        baseStyle.shadowColor = glow;
        baseStyle.shadowOffset = { width: 0, height: 0 };
        baseStyle.shadowOpacity = 0.4;
        baseStyle.shadowRadius = 16;
      } else {
        baseStyle.elevation = 8;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = glow + "40";
      }
    }

    return baseStyle;
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
};
