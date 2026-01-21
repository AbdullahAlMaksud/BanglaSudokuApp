import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

interface ThemedTextProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "label";
  color?: string;
  weight?: "regular" | "bold";
  align?: "left" | "center" | "right";
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = "body",
  color,
  weight,
  align,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextStyle = () => {
    const fontSize = (() => {
      switch (variant) {
        case "h1":
          return theme.typography.fontSize.xxl;
        case "h2":
          return theme.typography.fontSize.xl;
        case "h3":
          return theme.typography.fontSize.lg;
        case "caption":
          return theme.typography.fontSize.xs;
        case "label":
          return theme.typography.fontSize.sm;
        default:
          return theme.typography.fontSize.md;
      }
    })();

    return {
      color: color || theme.colors.text,
      textAlign: align || "left",
      fontFamily:
        weight === "bold"
          ? theme.typography.fontFamily.bold
          : theme.typography.fontFamily.regular,
      fontSize,
      fontWeight: weight === "bold" ? ("bold" as const) : ("normal" as const),
    };
  };

  return <RNText style={[getTextStyle(), style]} {...props} />;
};
