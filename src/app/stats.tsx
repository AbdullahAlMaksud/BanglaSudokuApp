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

export default function StatsScreen() {
  const { theme } = useTheme();
  const { gamesPlayed, wins, bestTimes, recentGames } = useStatsStore();
  const styles = createStyles(theme);

  const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toBangla(mins.toString().padStart(2, "0"))}:${toBangla(secs.toString().padStart(2, "0"))}`;
  };

  const StatBox = ({ label, value, icon, color }: any) => (
    <Card style={styles.statBox} padding="lg">
      <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <ThemedText variant="h2" weight="bold" style={{ marginTop: 8 }}>
        {toBangla(value)}
      </ThemedText>
      <ThemedText variant="caption" color={theme.colors.textSecondary}>
        {label}
      </ThemedText>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="পরিসংখ্যান" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <StatBox
            label="মোট খেলা"
            value={gamesPlayed}
            icon="grid"
            color={theme.colors.primary}
          />
          <StatBox
            label="জয়ের হার"
            value={winRate + "%"}
            icon="trophy"
            color="#FFD700"
          />
        </View>

        <ThemedText variant="h3" style={styles.sectionTitle}>
          সেরা সময়
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {(["Easy", "Medium", "Hard", "Expert"] as Difficulty[]).map(
            (diff) => (
              <Card key={diff} style={styles.timeCard} padding="md">
                <ThemedText variant="caption">{diff}</ThemedText>
                <ThemedText
                  variant="h3"
                  weight="bold"
                  color={theme.colors.primary}
                >
                  {formatTime(bestTimes[diff])}
                </ThemedText>
              </Card>
            ),
          )}
        </ScrollView>

        <ThemedText variant="h3" style={styles.sectionTitle}>
          সাম্প্রতিক গেম
        </ThemedText>
        {recentGames.map((game) => (
          <Card key={game.id} style={styles.recentItem} padding="md">
            <View style={styles.recentLeft}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: game.won
                      ? theme.colors.success
                      : theme.colors.error,
                  },
                ]}
              />
              <View>
                <ThemedText variant="body" weight="bold">
                  {game.difficulty === "Easy"
                    ? "সহজ"
                    : game.difficulty === "Medium"
                      ? "মাঝারি"
                      : "কঠিন"}{" "}
                  পাজল
                </ThemedText>
                <ThemedText
                  variant="caption"
                  color={theme.colors.textSecondary}
                >
                  {new Date(game.date).toLocaleDateString()}
                </ThemedText>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <ThemedText variant="body" weight="bold">
                {formatTime(game.time)}
              </ThemedText>
              <ThemedText
                variant="caption"
                color={game.won ? theme.colors.success : theme.colors.error}
              >
                {game.won ? "জয়ী" : "পরিত্যাক্ত"}
              </ThemedText>
            </View>
          </Card>
        ))}
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
    timeCard: {
      width: 100,
      alignItems: "center",
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
