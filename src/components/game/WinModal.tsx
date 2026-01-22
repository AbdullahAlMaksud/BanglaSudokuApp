import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

interface WinModalProps {
  visible: boolean;
  timeElapsed: number;
  mistakes: number;
  difficulty: string;
  onNewGame: () => void;
  onHome: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  visible,
  timeElapsed,
  mistakes,
  difficulty,
  onNewGame,
  onHome,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "সহজ";
      case "Medium":
        return "মাঝারি";
      case "Hard":
        return "কঠিন";
      case "Expert":
        return "বিশেষজ্ঞ";
      default:
        return diff;
    }
  };

  const handleNewGame = () => {
    hapticService.mediumTap();
    onNewGame();
  };

  const handleHome = () => {
    hapticService.lightTap();
    onHome();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Header Actions */}
        <View style={styles.header}>
          <Pressable onPress={handleHome} style={styles.headerButton}>
            <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        {/* Success Icon */}
        <View style={styles.iconSection}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={64} color="#FFF" />
          </View>
        </View>

        {/* Title */}
        <ThemedText variant="h1" weight="bold" style={styles.title}>
          পাজল সম্পন্ন!
        </ThemedText>
        <ThemedText
          variant="body"
          color={theme.colors.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          আপনি সফলভাবে এই স্তরটি শেষ করেছেন
        </ThemedText>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <ThemedText variant="caption" color={theme.colors.textSecondary}>
            মোট সময়
          </ThemedText>
          <ThemedText variant="h1" weight="bold" style={styles.timeText}>
            {formatTime(timeElapsed)}
          </ThemedText>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText variant="caption" color={theme.colors.textSecondary}>
                অসুবিধা
              </ThemedText>
              <ThemedText variant="body" weight="bold">
                {getDifficultyLabel(difficulty)}
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="caption" color={theme.colors.textSecondary}>
                ভুল
              </ThemedText>
              <ThemedText variant="body" weight="bold">
                {toBangla(mistakes)}/৩
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleNewGame}
          >
            <Ionicons name="refresh" size={20} color="#FFF" />
            <ThemedText variant="body" weight="bold" color="#FFF">
              আবার খেলুন
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
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 50,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginBottom: 40,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    iconSection: {
      alignItems: "center",
      marginBottom: 24,
    },
    successCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      ...(Platform.OS === "ios"
        ? {
          shadowColor: theme.colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
        }
        : { elevation: 10 }),
    },
    title: {
      textAlign: "center",
      marginBottom: 8,
    },
    subtitle: {
      marginHorizontal: 40,
      marginBottom: 32,
    },
    statsCard: {
      marginHorizontal: 24,
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      gap: 8,
    },
    timeText: {
      fontSize: 48,
      letterSpacing: 2,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    statItem: {
      alignItems: "center",
      gap: 4,
    },
    actions: {
      position: "absolute",
      bottom: 60,
      left: 24,
      right: 24,
      gap: 16,
      alignItems: "center",
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
      ...(Platform.OS === "ios"
        ? {
          shadowColor: theme.colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }
        : { elevation: 4 }),
    },
    buttonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    linkText: {
      marginTop: 8,
    },
  });
