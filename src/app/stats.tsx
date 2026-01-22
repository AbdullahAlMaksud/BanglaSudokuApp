import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { ThemedText } from "../components/ui/ThemedText";
import { Difficulty } from "../features/sudoku/types";
import { useStatsStore } from "../store/statsStore";
import { useTheme } from "../styles/ThemeContext";
import { toBangla } from "../utils/bangla";

type DifficultyMode = "Easy" | "Medium" | "Hard";

const DIFFICULTIES: { key: DifficultyMode; label: string }[] = [
  { key: "Easy", label: "সহজ" },
  { key: "Medium", label: "মাঝারি" },
  { key: "Hard", label: "কঠিন" },
];

export default function StatsScreen() {
  const { theme } = useTheme();
  const { gamesPlayed, wins, bestTimes, recentGames } = useStatsStore();
  const styles = createStyles(theme);
  const colors = theme.colors as any;

  const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";
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

  const StatBox = ({ label, value, icon, color }: any) => (
    <Card style={styles.statBox} padding="lg">
      <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <ThemedText variant="h2" weight="bold" style={{ marginTop: 8 }}>
        {typeof value === "number" ? toBangla(value) : value}
      </ThemedText>
      <ThemedText variant="caption" color={colors.textSecondary}>
        {label}
      </ThemedText>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="পরিসংখ্যান" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary Stats */}
        <View style={styles.row}>
          <StatBox
            label="মোট খেলা"
            value={gamesPlayed}
            icon="grid"
            color={colors.primary}
          />
          <StatBox
            label="জয়ের হার"
            value={toBangla(winRate) + "%"}
            icon="trophy"
            color="#FFD700"
          />
        </View>

        {/* Best Times - Only 3 difficulties */}
        <ThemedText variant="h3" weight="bold" style={styles.sectionTitle}>
          সেরা সময়
        </ThemedText>
        <View style={styles.timesRow}>
          {DIFFICULTIES.map((diff) => (
            <Card key={diff.key} style={styles.timeCard} padding="md">
              <ThemedText variant="caption" color={colors.textSecondary}>
                {diff.label}
              </ThemedText>
              <ThemedText
                variant="h3"
                weight="bold"
                color={colors.primary}
              >
                {formatTime(bestTimes[diff.key as Difficulty])}
              </ThemedText>
            </Card>
          ))}
        </View>

        {/* Recent Games */}
        <ThemedText variant="h3" weight="bold" style={styles.sectionTitle}>
          সাম্প্রতিক গেম
        </ThemedText>

        {recentGames.length === 0 ? (
          <Card padding="lg" style={styles.emptyCard}>
            <Ionicons name="game-controller-outline" size={48} color={colors.textSecondary} />
            <ThemedText variant="body" color={colors.textSecondary} style={{ marginTop: 12 }}>
              এখনো কোনো গেম খেলা হয়নি
            </ThemedText>
          </Card>
        ) : (
          recentGames.slice(0, 10).map((game) => (
            <Card key={game.id} style={styles.recentItem} padding="md">
              <View style={styles.recentLeft}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: game.won
                        ? colors.success
                        : colors.error,
                    },
                  ]}
                />
                <View>
                  <ThemedText variant="body" weight="bold">
                    {getDifficultyLabel(game.difficulty)} পাজল
                  </ThemedText>
                  <ThemedText variant="caption" color={colors.textSecondary}>
                    {new Date(game.date).toLocaleDateString("bn-BD")}
                  </ThemedText>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <ThemedText variant="body" weight="bold">
                  {formatTime(game.time)}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  color={game.won ? colors.success : colors.error}
                >
                  {game.won ? "জয়ী" : "পরিত্যাক্ত"}
                </ThemedText>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
      paddingBottom: 40,
    },
    row: {
      flexDirection: "row",
      gap: theme.spacing.md,
      justifyContent: "space-between",
    },
    statBox: {
      flex: 1,
      alignItems: "center",
    },
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    sectionTitle: {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
    },
    timesRow: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    timeCard: {
      flex: 1,
      alignItems: "center",
    },
    emptyCard: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
    recentItem: {
      marginBottom: theme.spacing.sm,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    recentLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
  });
