import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { ThemedText } from "../components/ui/ThemedText";
import { Difficulty } from "../features/sudoku/types";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../styles/ThemeContext";

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { startGame, status } = useGameStore();
  const styles = createStyles(theme);

  const handleNewGame = (difficulty: Difficulty) => {
    startGame(difficulty);
    router.push("/game");
  };

  return (
    <View style={styles.container}>
      <Header
        rightAction={
          <Ionicons
            name="settings-outline"
            size={24}
            color={theme.colors.text}
            onPress={() => router.push("/settings")}
          />
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText variant="h1" weight="bold" style={styles.title}>
          সুডোকু
        </ThemedText>

        {status === "playing" || status === "paused" ? (
          <Card style={styles.resumeCard} padding="lg">
            <View style={styles.resumeInfo}>
              <ThemedText variant="h3" weight="bold">
                চালিয়ে যান
              </ThemedText>
              <ThemedText variant="caption">পূর্বের গেম</ThemedText>
            </View>
            <Button
              title=""
              icon={<Ionicons name="play" size={20} color="#FFF" />}
              onPress={() => router.push("/game")}
              style={styles.playButton}
            />
          </Card>
        ) : null}

        <ThemedText variant="h3" style={styles.sectionTitle}>
          অসুবিধা নির্বাচন করুন
        </ThemedText>

        <View style={styles.grid}>
          <GridButton
            label="সহজ"
            icon="feather"
            color="#4CAF50"
            onPress={() => handleNewGame("Easy")}
            theme={theme}
          />
          <GridButton
            label="মাঝারি"
            icon="scale-balance"
            color="#FF9800"
            onPress={() => handleNewGame("Medium")}
            theme={theme}
          />
          <GridButton
            label="কঠিন"
            icon="fire"
            color="#F44336"
            onPress={() => handleNewGame("Hard")}
            theme={theme}
          />
          <GridButton
            label="বিশেষজ্ঞ"
            icon="lightning-bolt"
            color="#9C27B0"
            onPress={() => handleNewGame("Expert")}
            theme={theme}
          />
        </View>

        <Card style={styles.promoCard} variant="elevated">
          <TouchableOpacity
            onPress={() => router.push("/stats")}
            style={styles.promoContent}
          >
            <View style={styles.promoIcon}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText variant="body" weight="bold" color="#FFF">
                প্রতিদিন খেলুন
              </ThemedText>
              <ThemedText variant="caption" color="rgba(255,255,255,0.8)">
                এবং ট্রফি জিতুন
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </Card>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavIcon
          name="home"
          label="হোম"
          isActive
          onPress={() => {}}
          theme={theme}
        />
        <NavIcon
          name="chart-bar"
          label="পরিসংখ্যান"
          onPress={() => router.push("/stats")}
          theme={theme}
        />
        <NavIcon
          name="account"
          label="প্রোফাইল"
          onPress={() => {}}
          theme={theme}
        />
      </View>
    </View>
  );
}

const GridButton = ({
  label,
  icon,
  color,
  onPress,
  theme,
}: {
  label: string;
  icon: any;
  color: string;
  onPress: () => void;
  theme: any;
}) => {
  const styles = createStyles(theme);
  return (
    <Card style={styles.gridCard} padding="md">
      <TouchableOpacity style={styles.gridBtnTouch} onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={32} color={color} />
        <ThemedText variant="body" weight="bold" style={{ marginTop: 8 }}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    </Card>
  );
};

const NavIcon = ({
  name,
  label,
  isActive,
  onPress,
  theme,
}: {
  name: any;
  label: string;
  isActive?: boolean;
  onPress: () => void;
  theme: any;
}) => {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <MaterialCommunityIcons
        name={name}
        size={24}
        color={isActive ? theme.colors.primary : theme.colors.textSecondary}
      />
      <ThemedText
        variant="caption"
        color={isActive ? theme.colors.primary : theme.colors.textSecondary}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
      paddingBottom: 100,
    },
    title: {
      color: theme.colors.primary,
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    resumeCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    resumeInfo: {
      gap: 4,
    },
    playButton: {
      borderRadius: theme.radius.round,
      width: 48,
      height: 48,
      paddingHorizontal: 0,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
    },
    gridCard: {
      width: "47%",
      aspectRatio: 1.4,
      padding: 0,
      overflow: "hidden",
    },
    gridBtnTouch: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    promoCard: {
      backgroundColor: theme.colors.primary,
      marginTop: theme.spacing.xl,
      padding: 0,
    },
    promoContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
    },
    promoIcon: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: "rgba(255,255,255,0.2)",
      justifyContent: "center",
      alignItems: "center",
    },
    bottomNav: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
  });
