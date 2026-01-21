import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import { ThemedText } from "../ui/ThemedText";

export const Controls: React.FC = () => {
  const { theme } = useTheme();
  const { undo, toggleErase, toggleNote, hint, isNoteMode } = useGameStore();
  const styles = createStyles(theme);

  const ControlButton = ({
    icon,
    label,
    onPress,
    isActive = false,
  }: {
    icon: any;
    label: string;
    onPress: () => void;
    isActive?: boolean;
  }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={[styles.iconContainer, isActive && styles.activeIcon]}>
        {icon}
      </View>
      <ThemedText variant="caption" style={styles.label}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ControlButton
        label="ফিরিয়ে নিন"
        icon={
          <Ionicons name="arrow-undo" size={24} color={theme.colors.text} />
        }
        onPress={undo}
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
        onPress={toggleErase}
      />
      <ControlButton
        label="নোট"
        isActive={isNoteMode}
        icon={
          <MaterialCommunityIcons
            name="pencil"
            size={24}
            color={isNoteMode ? "#FFF" : theme.colors.text}
          />
        }
        onPress={toggleNote}
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
        onPress={hint}
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
      width: 48,
      height: 48,
      borderRadius: theme.radius.round,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    activeIcon: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      color: theme.colors.textSecondary,
      fontSize: 12,
    },
  });
