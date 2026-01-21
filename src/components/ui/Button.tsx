import React from "react";
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { ThemedText } from "./ThemedText";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const { theme } = useTheme();

  const getContainerStyle = (): ViewStyle => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    opacity: disabled ? 0.6 : 1,
    backgroundColor: (() => {
      switch (variant) {
        case "primary":
          return theme.colors.primary;
        case "secondary":
          return theme.colors.selection;
        case "outline":
          return "transparent";
        case "ghost":
          return "transparent";
        default:
          return theme.colors.primary;
      }
    })(),
    borderWidth: variant === "outline" ? 2 : 0,
    borderColor: variant === "outline" ? theme.colors.primary : "transparent",
    paddingVertical: size === "sm" ? 8 : size === "lg" ? 16 : 12,
    paddingHorizontal: size === "sm" ? 16 : size === "lg" ? 32 : 24,
  });

  const getTextStyle = (): TextStyle => ({
    color: (() => {
      switch (variant) {
        case "primary":
          return "#FFFFFF";
        case "secondary":
          return theme.colors.primaryDark;
        case "outline":
          return theme.colors.primary;
        case "ghost":
          return theme.colors.textSecondary;
        default:
          return "#FFFFFF";
      }
    })(),
    fontSize:
      size === "sm"
        ? theme.typography.fontSize.sm
        : size === "lg"
          ? theme.typography.fontSize.lg
          : theme.typography.fontSize.md,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost"
              ? theme.colors.primary
              : "#FFF"
          }
        />
      ) : (
        <>
          {icon}
          <ThemedText
            style={[getTextStyle(), textStyle, icon ? { marginLeft: 8 } : {}]}
            weight="bold"
          >
            {title}
          </ThemedText>
        </>
      )}
    </TouchableOpacity>
  );
};
