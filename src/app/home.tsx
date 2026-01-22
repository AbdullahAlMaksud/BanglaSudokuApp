import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../components/ui/ThemedText";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../styles/ThemeContext";
import hapticService from "../utils/hapticService";

type DifficultyOption = "Easy" | "Medium" | "Hard";

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { startGame, status, timeElapsed, difficulty } = useGameStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyOption>("Easy");
  const [isLoading, setIsLoading] = useState(false);
  const styles = createStyles(theme);
  const colors = theme.colors as any;

  const handlePlay = () => {
    if (isLoading) return;

    hapticService.mediumTap();
    setIsLoading(true);

    // Simulate loading for better UX and give time for heavy generation if needed
    setTimeout(() => {
      startGame(selectedDifficulty);
      router.push("/game");
      setIsLoading(false);
    }, 500);
  };

  const handleDifficultyChange = (diff: DifficultyOption) => {
    hapticService.selection();
    setSelectedDifficulty(diff);
  };

  const difficulties: { key: DifficultyOption; label: string }[] = [
    { key: "Easy", label: "সহজ" },
    { key: "Medium", label: "মাঝারি" },
    { key: "Hard", label: "কঠিন" },
  ];

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.gridLogo}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={styles.gridRow}>
              {[0, 1, 2].map((col) => (
                <View
                  key={col}
                  style={[
                    styles.gridCell,
                    row === 1 && col === 1 && styles.gridCellHighlight,
                  ]}
                >
                  {row === 1 && col === 1 && (
                    <ThemedText
                      variant="caption"
                      color={theme.colors.primary}
                      weight="bold"
                    >
                      ৭
                    </ThemedText>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>

        <ThemedText variant="h1" weight="bold" style={styles.title}>
          সুডোকু
        </ThemedText>
        <ThemedText variant="caption" color={theme.colors.textSecondary}>
          CLASSIC PUZZLE GAME
        </ThemedText>
      </View>

      {/* Difficulty Selector */}
      <View style={styles.difficultyContainer}>
        <View style={styles.difficultyPill}>
          {difficulties.map((diff) => (
            <Pressable
              key={diff.key}
              style={[
                styles.difficultyTab,
                selectedDifficulty === diff.key && styles.difficultyTabActive,
              ]}
              onPress={() => handleDifficultyChange(diff.key)}
            >
              <ThemedText
                variant="body"
                weight={selectedDifficulty === diff.key ? "bold" : "regular"}
                color={
                  selectedDifficulty === diff.key
                    ? theme.colors.text
                    : theme.colors.textSecondary
                }
              >
                {diff.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Play Button */}
      <View style={styles.playButtonSection}>
        <Pressable
          onPress={handlePlay}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.playButtonOuter,
            (pressed || isLoading) && styles.playButtonPressed,
          ]}
        >
          <View style={styles.playButtonInner}>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                <Ionicons name="play" size={40} color={theme.colors.primary} />
                <ThemedText variant="body" weight="bold" style={{ marginTop: 8 }}>
                  খেলুন
                </ThemedText>
              </>
            )}
          </View>
        </Pressable>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavButton
          icon="cog-outline"
          onPress={() => router.push("/settings")}
          theme={theme}
        />
        <NavButton
          icon="chart-bar"
          onPress={() => router.push("/stats")}
          theme={theme}
        />
        <NavButton
          icon="star-outline"
          onPress={() => { }}
          theme={theme}
        />
        <NavButton
          icon="help-circle-outline"
          onPress={() => router.push("/how-to-play")}
          theme={theme}
        />
      </View>
    </View>
  );
}

const NavButton = ({
  icon,
  onPress,
  theme,
}: {
  icon: string;
  onPress: () => void;
  theme: any;
}) => (
  <Pressable
    onPress={() => {
      hapticService.lightTap();
      onPress();
    }}
    style={({ pressed }) => ({
      opacity: pressed ? 0.6 : 1,
      padding: 12,
    })}
  >
    <MaterialCommunityIcons
      name={icon as any}
      size={28}
      color={theme.colors.textSecondary}
    />
  </Pressable>
);

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    logoSection: {
      alignItems: "center",
      marginBottom: 40,
    },
    gridLogo: {
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      borderRadius: 16,
      padding: 12,
      gap: 6,
      marginBottom: 20,
    },
    gridRow: {
      flexDirection: "row",
      gap: 6,
    },
    gridCell: {
      width: 32,
      height: 32,
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.boardLine || theme.colors.border,
    },
    gridCellHighlight: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    title: {
      fontSize: 42,
      color: theme.colors.text,
    },
    difficultyContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    difficultyPill: {
      flexDirection: "row",
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      borderRadius: 25,
      padding: 4,
    },
    difficultyTab: {
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 20,
    },
    difficultyTabActive: {
      backgroundColor: theme.colors.surface,
      ...(Platform.OS === "ios"
        ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
        : { elevation: 2 }),
    },
    playButtonSection: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    playButtonOuter: {
      width: 160,
      height: 160,
      borderRadius: 80,
      borderWidth: 3,
      borderColor: theme.colors.surfaceLight || theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    playButtonPressed: {
      transform: [{ scale: 0.95 }],
      borderColor: theme.colors.primary,
    },
    playButtonInner: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomNav: {
      position: "absolute",
      bottom: 30,
      left: 24,
      right: 24,
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 16,
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      borderRadius: 30,
    },
  });
