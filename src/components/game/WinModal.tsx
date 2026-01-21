import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Modal, Platform, StyleSheet, View } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { Button } from "../ui/Button";
import { ThemedText } from "../ui/ThemedText";

interface WinModalProps {
  visible: boolean;
  timeElapsed: number;
  mistakes: number;
  onNewGame: () => void;
  onHome: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  visible,
  timeElapsed,
  mistakes,
  onNewGame,
  onHome,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Trigger success haptic when modal becomes visible
  useEffect(() => {
    if (visible) {
      hapticService.success();
    }
  }, [visible]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toBangla(mins.toString().padStart(2, "0"))}:${toBangla(secs.toString().padStart(2, "0"))}`;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="ribbon" size={48} color={theme.colors.primary} />
          </View>

          <ThemedText variant="h2" weight="bold" style={styles.title}>
            পাজল সম্পন্ন হয়েছে!
          </ThemedText>
          <ThemedText
            variant="body"
            color={theme.colors.textSecondary}
            align="center"
          >
            অসাধারণ! আপনি সফলভাবে সমাধান করেছেন।
          </ThemedText>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time" size={20} color={theme.colors.primary} />
              <ThemedText variant="caption">সময়</ThemedText>
              <ThemedText variant="h3" weight="bold">
                {formatTime(timeElapsed)}
              </ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Ionicons name="close-circle" size={20} color={theme.colors.error} />
              <ThemedText variant="caption">ভুল</ThemedText>
              <ThemedText variant="h3" weight="bold">
                {toBangla(mistakes)}
              </ThemedText>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title="পরবর্তী খেলুন"
              icon={<Ionicons name="arrow-forward" size={20} color="#FFF" />}
              onPress={onNewGame}
              style={styles.fullBtn}
            />
            <Button
              title="আবার খেলুন"
              variant="secondary"
              icon={<Ionicons name="refresh" size={20} color={theme.colors.primaryDark} />}
              onPress={onNewGame}
              style={styles.fullBtn}
            />
            <Button
              title="হোম"
              variant="ghost"
              icon={
                <Ionicons
                  name="home"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              }
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
      backgroundColor: "rgba(0,0,0,0.6)",
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
          shadowColor: theme.colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        }
        : { elevation: 10 }),
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.round,
      backgroundColor: theme.colors.selection,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    title: {
      color: theme.colors.primary,
    },
    statsRow: {
      flexDirection: "row",
      backgroundColor: theme.colors.highlight,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      marginVertical: theme.spacing.sm,
    },
    statItem: {
      alignItems: "center",
      gap: 4,
    },
    divider: {
      width: 1,
      height: "80%",
      backgroundColor: theme.colors.border,
    },
    actions: {
      width: "100%",
      gap: theme.spacing.sm,
    },
    fullBtn: {
      width: "100%",
    },
  });
