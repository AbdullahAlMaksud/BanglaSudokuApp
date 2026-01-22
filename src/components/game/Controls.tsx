import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import hapticService from "../../utils/hapticService";
import { GameSettingsModal } from "./GameSettingsModal";

export const Controls: React.FC = () => {
  const { theme } = useTheme();
  const { undo, toggleNote, hint, isNoteMode } = useGameStore();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const styles = createStyles(theme);

  const handleUndo = () => {
    hapticService.lightTap();
    undo();
  };

  const handleReset = () => {
    hapticService.mediumTap();
    useGameStore.getState().resetGame();
  };

  const handleNote = () => {
    hapticService.selection();
    toggleNote();
  };

  const handleHint = () => {
    hapticService.warning();
    hint();
  };

  const handleSettings = () => {
    hapticService.lightTap();
    setIsSettingsVisible(true);
  };

  const ControlButton = ({
    icon,
    onPress,
    isActive = false,
    hasIndicator = false,
    iconComponent,
  }: {
    icon?: string;
    onPress: () => void;
    isActive?: boolean;
    hasIndicator?: boolean;
    iconComponent?: React.ReactNode;
  }) => (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.7, transform: [{ scale: 0.9 }] },
      ]}
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        {iconComponent || (
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color={isActive ? theme.colors.primary : theme.colors.textSecondary}
          />
        )}
        {hasIndicator && <View style={styles.indicator} />}
      </View>
    </Pressable>
  );

  return (
    <>
      <View style={styles.container}>
        <ControlButton icon="cog-outline" onPress={handleSettings} />
        <ControlButton icon="refresh" onPress={handleReset} />
        <ControlButton
          icon="pencil-outline"
          onPress={handleNote}
          isActive={isNoteMode}
        />
        <ControlButton icon="undo" onPress={handleUndo} />
        <ControlButton
          icon="lightbulb-outline"
          onPress={handleHint}
          hasIndicator={true}
        />
      </View>

      <GameSettingsModal
        visible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    button: {
      padding: 12,
    },
    iconWrapper: {
      position: "relative",
    },
    indicator: {
      position: "absolute",
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
  });
