import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

export const Controls: React.FC = () => {
  const { theme } = useTheme();
  const { undo, toggleErase, toggleNote, hint, isNoteMode } = useGameStore();
  const styles = createStyles(theme);

  const handleUndo = () => {
    hapticService.lightTap();
    undo();
  };

  const handleErase = () => {
    hapticService.lightTap();
    toggleErase();
  };

  const handleNote = () => {
    hapticService.selection();
    toggleNote();
  };

  const handleHint = () => {
    hapticService.warning();
    hint();
  };

  const ControlButton = ({
    icon,
    label,
    onPress,
    isActive = false,
    badge,
  }: {
    icon: any;
    label: string;
    onPress: () => void;
    isActive?: boolean;
    badge?: string;
  }) => {
    const getIconContainerStyle = (pressed: boolean) => {
      const baseStyle: any = {
        ...styles.iconContainer,
        ...(isActive && styles.activeIcon),
        transform: [{ scale: pressed ? 0.9 : 1 }],
      };

      // Add glow for active state
      if (isActive) {
        if (Platform.OS === "ios") {
          baseStyle.shadowColor = theme.colors.primary;
          baseStyle.shadowOffset = { width: 0, height: 0 };
          baseStyle.shadowOpacity = 0.5;
          baseStyle.shadowRadius = 10;
        } else {
          baseStyle.elevation = 8;
        }
      }

      return baseStyle;
    };

    return (
      <Pressable style={styles.button} onPress={onPress}>
        {({ pressed }) => (
          <>
            <View style={getIconContainerStyle(pressed)}>
              {icon}
              {badge && (
                <View style={styles.badge}>
                  <ThemedText
                    variant="caption"
                    style={{ fontSize: 10, color: "#FFF" }}
                  >
                    {badge}
                  </ThemedText>
                </View>
              )}
            </View>
            <ThemedText variant="caption" style={styles.label}>
              {label}
            </ThemedText>
          </>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ControlButton
        label="বাতিল"
        icon={
          <Ionicons name="arrow-undo" size={24} color={theme.colors.text} />
        }
        onPress={handleUndo}
      />
      <ControlButton
        label="মুছুন"
        icon={
          <MaterialCommunityIcons
            name="eraser"
            size={24}
            color={theme.colors.text}
          />
        }
        onPress={handleErase}
      />
      <ControlButton
        label="নোট"
        isActive={isNoteMode}
        badge={isNoteMode ? "চালু" : undefined}
        icon={
          <MaterialCommunityIcons
            name="pencil"
            size={24}
            color={isNoteMode ? "#FFF" : theme.colors.text}
          />
        }
        onPress={handleNote}
      />
      <ControlButton
        label="ইঙ্গিত"
        icon={
          <MaterialCommunityIcons
            name="lightbulb-on"
            size={24}
            color={theme.colors.text}
          />
        }
        onPress={handleHint}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginVertical: theme.spacing.lg,
    },
    button: {
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: theme.radius.round,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    activeIcon: {
      backgroundColor: theme.colors.primary,
    },
    badge: {
      position: "absolute",
      top: -4,
      right: -4,
      backgroundColor: theme.colors.error,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    label: {
      color: theme.colors.textSecondary,
      fontSize: 12,
    },
  });
