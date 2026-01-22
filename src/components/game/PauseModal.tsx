import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

interface PauseModalProps {
  visible: boolean;
  onResume: () => void;
  onRestart: () => void;
  onHome: () => void;
  timeElapsed: number;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  visible,
  onResume,
  onRestart,
  onHome,
  timeElapsed,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toBangla(mins.toString().padStart(2, "0"))}:${toBangla(secs.toString().padStart(2, "0"))}`;
  };

  const handleResume = () => {
    hapticService.mediumTap();
    onResume();
  };

  const handleRestart = () => {
    hapticService.mediumTap();
    onRestart();
  };

  const handleHome = () => {
    hapticService.lightTap();
    onHome();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Pause Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="pause" size={32} color="#FFF" />
          </View>

          <ThemedText variant="h2" weight="bold" style={styles.title}>
            খেলা থামানো হয়েছে
          </ThemedText>
          <ThemedText variant="body" color={theme.colors.textSecondary}>
            বিরতি নিন এবং প্রস্তুত হলে পুনরায় শুরু করুন
          </ThemedText>

          {/* Timer */}
          <View style={styles.timerChip}>
            <Ionicons
              name="time-outline"
              size={18}
              color={theme.colors.primary}
            />
            <ThemedText variant="h3" weight="bold" color={theme.colors.primary}>
              {formatTime(timeElapsed)}
            </ThemedText>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleResume}
            >
              <Ionicons name="play" size={20} color="#FFF" />
              <ThemedText variant="body" weight="bold" color="#FFF">
                পুনরায় শুরু করুন
              </ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleRestart}
            >
              <Ionicons name="refresh" size={20} color={theme.colors.text} />
              <ThemedText variant="body" weight="bold">
                আবার শুরু করুন
              </ThemedText>
            </Pressable>

            <Pressable onPress={handleHome}>
              <ThemedText
                variant="body"
                color={theme.colors.textSecondary}
                style={styles.linkText}
              >
                মেনুতে ফিরে যান
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    card: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      padding: 32,
      alignItems: "center",
      gap: 12,
      ...(Platform.OS === "ios"
        ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
        }
        : { elevation: 10 }),
    },
    iconContainer: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    title: {
      marginTop: 8,
    },
    timerChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.colors.surfaceLight || theme.colors.highlight,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
      marginVertical: 16,
    },
    actions: {
      width: "100%",
      gap: 12,
      marginTop: 8,
    },
    primaryButton: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: 30,
    },
    secondaryButton: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: theme.colors.surfaceLight || theme.colors.highlight,
      paddingVertical: 16,
      borderRadius: 30,
    },
    buttonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    linkText: {
      marginTop: 8,
      textAlign: "center",
    },
  });
