import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { ThemedText } from "../components/ui/ThemedText";
import { Difficulty } from "../features/sudoku/types";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../styles/ThemeContext";
import hapticService from "../utils/hapticService";

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { startGame, status, timeElapsed, difficulty } = useGameStore();
  const styles = createStyles(theme);

  const handleNewGame = (diff: Difficulty) => {
    startGame(diff);
    router.push("/game");
  };

  const handleContinue = () => {
    hapticService.mediumTap();
    router.push("/game");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

  return (
    <View style={styles.container}>
      <Header
        leftAction={
          <Ionicons
            name="grid-outline"
            size={24}
            color={theme.colors.text}
            onPress={() => router.push("/how-to-play")}
          />
        }
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
        {/* Play Button */}
        <Button
          title="খেলুন"
          icon={<Ionicons name="play" size={24} color="#FFF" />}
          onPress={() => handleNewGame("Medium")}
          size="lg"
          style={styles.mainPlayButton}
        />

        {/* Resume Card */}
        {(status === "playing" || status === "paused") && (
          <Card style={styles.resumeCard} padding="md">
            <Pressable style={styles.resumeContent} onPress={handleContinue}>
              <View style={styles.resumeInfo}>
                <ThemedText variant="body" weight="bold">
                  চালিয়ে যান
                </ThemedText>
                <ThemedText variant="caption" color={theme.colors.textSecondary}>
                  {getDifficultyLabel(difficulty)} • {formatTime(timeElapsed)}
                </ThemedText>
              </View>
              <Ionicons name="play" size={24} color={theme.colors.primary} />
            </Pressable>
          </Card>
        )}

        <ThemedText variant="h3" weight="bold" style={styles.sectionTitle}>
          অসুবিধা নির্বাচন করুন
        </ThemedText>

        <View style={styles.grid}>
          <GridButton
            label="সহজ"
            icon="feather"
            color="#4CAF50"
            bgColor="#E8F5E9"
            onPress={() => handleNewGame("Easy")}
            theme={theme}
          />
          <GridButton
            label="মাঝারি"
            icon="scale-balance"
            color="#FF9800"
            bgColor="#FFF3E0"
            onPress={() => handleNewGame("Medium")}
            theme={theme}
          />
          <GridButton
            label="কঠিন"
            icon="cog"
            color="#F44336"
            bgColor="#FFEBEE"
            onPress={() => handleNewGame("Hard")}
            theme={theme}
          />
          <GridButton
            label="বিশেষজ্ঞ"
            icon="lightning-bolt"
            color="#9C27B0"
            bgColor="#F3E5F5"
            onPress={() => handleNewGame("Expert")}
            theme={theme}
          />
        </View>

        {/* Daily Challenge Promo */}
        <Card style={styles.promoCard} variant="elevated">
          <Pressable
            onPress={() => router.push("/stats")}
            style={styles.promoContent}
          >
            <View style={styles.promoIcon}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText variant="body" weight="bold" color="#FFF">
                দৈনিক চ্যালেঞ্জ
              </ThemedText>
              <ThemedText variant="caption" color="rgba(255,255,255,0.8)">
                ৩টি ট্রফি জিতুন
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFF" />
          </Pressable>
        </Card>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavIcon
          name="home"
          label="হোম"
          isActive
          onPress={() => { }}
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
          onPress={() => { }}
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
  bgColor,
  onPress,
  theme,
}: {
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  onPress: () => void;
  theme: any;
}) => {
  const styles = createStyles(theme);

  const handlePress = () => {
    hapticService.mediumTap();
    onPress();
  };

  const getButtonStyle = (pressed: boolean) => {
    const baseStyle: any = {
      ...styles.gridCard,
      backgroundColor: bgColor,
      transform: [{ scale: pressed ? 0.96 : 1 }],
    };

    if (Platform.OS === "ios") {
      baseStyle.shadowColor = color;
      baseStyle.shadowOffset = { width: 0, height: pressed ? 2 : 4 };
      baseStyle.shadowOpacity = pressed ? 0.15 : 0.25;
      baseStyle.shadowRadius = pressed ? 4 : 8;
    } else {
      baseStyle.elevation = pressed ? 2 : 4;
    }

    return baseStyle;
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => getButtonStyle(pressed)}>
      <View style={[styles.gridIconContainer, { backgroundColor: bgColor }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>
      <ThemedText variant="body" weight="bold" style={{ marginTop: 8 }}>
        {label}
      </ThemedText>
      <View style={[styles.difficultyBar, { backgroundColor: color }]} />
    </Pressable>
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
  const handlePress = () => {
    hapticService.lightTap();
    onPress();
  };

  return (
    <Pressable style={{ alignItems: "center" }} onPress={handlePress}>
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
    </Pressable>
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
    mainPlayButton: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.md,
    },
    resumeCard: {
      marginBottom: theme.spacing.md,
    },
    resumeContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    resumeInfo: {
      gap: 2,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
    },
    gridCard: {
      width: "47%",
      aspectRatio: 1.3,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
    },
    gridIconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
    },
    difficultyBar: {
      position: "absolute",
      bottom: 12,
      width: "40%",
      height: 3,
      borderRadius: 2,
    },
    promoCard: {
      backgroundColor: theme.colors.primaryDark,
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
