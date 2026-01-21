import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Board } from "../components/game/Board";
import { Controls } from "../components/game/Controls";
import { NumberPad } from "../components/game/NumberPad";
import { PauseModal } from "../components/game/PauseModal";
import { WinModal } from "../components/game/WinModal";
import { Header } from "../components/ui/Header";
import { ThemedText } from "../components/ui/ThemedText";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../styles/ThemeContext";
import { toBangla } from "../utils/bangla";

export default function GameScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    status,
    difficulty,
    timeElapsed,
    mistakes,
    tick,
    pauseGame,
    resumeGame,
    resetGame,
    startGame,
  } = useGameStore();

  const styles = createStyles(theme);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (status === "playing") {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, tick]);

  useEffect(() => {
    const backAction = () => {
      pauseGame();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [pauseGame]);

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

  return (
    <View style={styles.container}>
      <Header
        title={formatTime(timeElapsed)}
        showBack={true}
        rightAction={
          <Ionicons
            name="pause-circle"
            size={32}
            color={theme.colors.primary}
            onPress={pauseGame}
          />
        }
      />

      <View style={styles.infoBar}>
        <ThemedText variant="caption" color={theme.colors.textSecondary}>
          {getDifficultyLabel(difficulty)}
        </ThemedText>
        <View style={styles.mistakes}>
          <ThemedText variant="caption" color={theme.colors.error}>
            ভুল: {toBangla(mistakes)}/৩
          </ThemedText>
        </View>
      </View>

      <View style={styles.boardContainer}>
        <Board />
      </View>

      <View style={styles.controlsContainer}>
        <Controls />
        <NumberPad />
      </View>

      <PauseModal
        visible={status === "paused"}
        onResume={resumeGame}
        onRestart={resetGame}
        onHome={() => router.replace("/home")}
        timeElapsed={timeElapsed}
      />

      <WinModal
        visible={status === "won"}
        timeElapsed={timeElapsed}
        mistakes={mistakes}
        onNewGame={() => {
          startGame(difficulty);
        }}
        onHome={() => router.replace("/home")}
      />
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    infoBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    mistakes: {},
    boardContainer: {
      paddingHorizontal: theme.spacing.md,
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    controlsContainer: {
      paddingHorizontal: theme.spacing.md,
      flex: 1,
      justifyContent: "flex-start",
    },
  });
