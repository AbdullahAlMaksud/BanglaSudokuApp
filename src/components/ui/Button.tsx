import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import hapticService from "../../utils/hapticService";
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
  withHaptic?: boolean;
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
  withHaptic = true,
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    if (withHaptic) {
      hapticService.mediumTap();
    }
    onPress();
  };

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    const baseColor = (() => {
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
    })();

    const baseStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radius.md,
      opacity: disabled ? 0.6 : 1,
      backgroundColor: baseColor,
      borderWidth: variant === "outline" ? 2 : 0,
      borderColor: variant === "outline" ? theme.colors.primary : "transparent",
      paddingVertical: size === "sm" ? 8 : size === "lg" ? 16 : 12,
      paddingHorizontal: size === "sm" ? 16 : size === "lg" ? 32 : 24,
      transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
    };

    // Add glow/shadow for primary variant
    if (variant === "primary" && !disabled) {
      if (Platform.OS === "ios") {
        baseStyle.shadowColor = theme.colors.primary;
        baseStyle.shadowOffset = { width: 0, height: 4 };
        baseStyle.shadowOpacity = pressed ? 0.2 : 0.35;
        baseStyle.shadowRadius = pressed ? 6 : 10;
      } else {
        // @ts-ignore - elevation is valid for Android
        baseStyle.elevation = pressed ? 2 : 6;
      }
    }

    return baseStyle;
  };

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
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [getContainerStyle(pressed), style]}
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
    </Pressable>
  );
};
