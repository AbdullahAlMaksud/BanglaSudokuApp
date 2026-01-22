import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { BackHandler, Pressable, StyleSheet, View } from "react-native";
import { Board } from "../components/game/Board";
import { Controls } from "../components/game/Controls";
import { NumberPad } from "../components/game/NumberPad";
import { PauseModal } from "../components/game/PauseModal";
import { WinModal } from "../components/game/WinModal";
import { ThemedText } from "../components/ui/ThemedText";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../styles/ThemeContext";
import { toBangla } from "../utils/bangla";
import hapticService from "../utils/hapticService";

type InputMode = "numpad" | "single";

export default function GameScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [inputMode, setInputMode] = useState<InputMode>("numpad");
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
    setSelectedNumber,
    selectedNumber,
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
    return `${toBangla(mins.toString().padStart(2, "0"))}মি${toBangla(secs.toString().padStart(2, "0"))}সে`;
  };

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "সহজ স্তর";
      case "Medium":
        return "মাঝারি স্তর";
      case "Hard":
        return "কঠিন স্তর";
      case "Expert":
        return "বিশেষজ্ঞ স্তর";
      default:
        return diff;
    }
  };

  const handleBack = () => {
    hapticService.lightTap();
    pauseGame();
  };

  const handlePause = () => {
    hapticService.lightTap();
    pauseGame();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={28} color={theme.colors.text} />
        </Pressable>

        <View style={styles.headerCenter}>
          <ThemedText variant="caption" color={theme.colors.textSecondary}>
            {getDifficultyLabel(difficulty)}
          </ThemedText>
          <ThemedText variant="h2" weight="bold">
            {formatTime(timeElapsed)}
          </ThemedText>
        </View>

        <Pressable onPress={handlePause} style={styles.headerButton}>
          <View style={styles.pauseIcon}>
            <Ionicons name="pause" size={18} color={theme.colors.text} />
          </View>
        </Pressable>
      </View>

      {/* Board */}
      <View style={styles.boardContainer}>
        <Board inputMode={inputMode} />
      </View>

      {/* Input Mode Tabs */}
      <View style={styles.inputTabs}>
        <Pressable
          style={[
            styles.inputTab,
            inputMode === "numpad" && styles.inputTabActive,
          ]}
          onPress={() => setInputMode("numpad")}
        >
          <ThemedText
            variant="body"
            weight={inputMode === "numpad" ? "bold" : "regular"}
            color={
              inputMode === "numpad"
                ? theme.colors.text
                : theme.colors.textSecondary
            }
          >
            নাম্বার প্যাড
          </ThemedText>
        </Pressable>
        <Pressable
          style={[
            styles.inputTab,
            inputMode === "single" && styles.inputTabActive,
          ]}
          onPress={() => setInputMode("single")}
        >
          <ThemedText
            variant="body"
            weight={inputMode === "single" ? "bold" : "regular"}
            color={
              inputMode === "single"
                ? theme.colors.text
                : theme.colors.textSecondary
            }
          >
            একক সংখ্যা
          </ThemedText>
        </Pressable>
      </View>

      {/* Number Pad */}
      <View style={styles.numberPadContainer}>
        <NumberPad inputMode={inputMode} />
      </View>

      {/* Bottom Controls */}
      <Controls />

      {/* Modals */}
      <PauseModal
        visible={status === "paused"}
        onResume={resumeGame}
        onRestart={() => {
          resetGame();
        }}
        onHome={() => {
          useGameStore.getState().quitGame();
          router.replace("/home");
        }}
        timeElapsed={timeElapsed}
      />

      <WinModal
        visible={status === "won"}
        timeElapsed={timeElapsed}
        mistakes={mistakes}
        difficulty={difficulty}
        onNewGame={() => {
          startGame(difficulty);
        }}
        onHome={() => {
          useGameStore.getState().quitGame();
          router.replace("/home");
        }}
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
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    headerButton: {
      padding: 8,
    },
    headerCenter: {
      alignItems: "center",
    },
    pauseIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.colors.textSecondary,
      justifyContent: "center",
      alignItems: "center",
    },
    boardContainer: {
      paddingHorizontal: 16,
      alignItems: "center",
      marginBottom: 16,
    },
    inputTabs: {
      flexDirection: "row",
      marginHorizontal: 24,
      marginBottom: 16,
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      borderRadius: 8,
      padding: 4,
    },
    inputTab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 6,
    },
    inputTabActive: {
      backgroundColor: theme.colors.surface,
    },
    numberPadContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });
