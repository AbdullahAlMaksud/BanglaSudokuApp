import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import { Button } from "../ui/Button";
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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="pause" size={32} color="#FFF" />
          </View>

          <ThemedText variant="h2" weight="bold" style={styles.title}>
            খেলা থামানো হয়েছে
          </ThemedText>
          <ThemedText variant="body" color={theme.colors.textSecondary}>
            বিরতি নিন এবং পুনরায় শুরু করুন
          </ThemedText>

          <View style={styles.timerChip}>
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.colors.primary}
            />
            <ThemedText variant="h3" weight="bold" color={theme.colors.primary}>
              {formatTime(timeElapsed)}
            </ThemedText>
          </View>

          <View style={styles.actions}>
            <Button
              title="পুনরায় শুরু করুন"
              icon={<Ionicons name="play" size={20} color="#FFF" />}
              onPress={onResume}
              style={styles.fullBtn}
            />
            <Button
              title="আবার শুরু করুন"
              variant="secondary"
              icon={<Ionicons name="refresh" size={20} color={theme.colors.primaryDark} />}
              onPress={onRestart}
              style={styles.fullBtn}
            />
            <Button
              title="হোম পেজে যান"
              variant="ghost"
              icon={<Ionicons name="home" size={20} color={theme.colors.textSecondary} />}
              onPress={onHome}
              style={styles.fullBtn}
            />
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
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    card: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      padding: theme.spacing.xl,
      alignItems: "center",
      gap: theme.spacing.md,
      ...(Platform.OS === "ios"
        ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
        }
        : { elevation: 8 }),
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: theme.radius.round,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      marginTop: theme.spacing.xs,
    },
    timerChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: theme.colors.highlight,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.md,
      marginVertical: theme.spacing.sm,
    },
    actions: {
      width: "100%",
      gap: theme.spacing.sm,
    },
    fullBtn: {
      width: "100%",
    },
  });
