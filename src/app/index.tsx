import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ui/ThemedText";
import { useTheme } from "../styles/ThemeContext";
import { toBangla } from "../utils/bangla";

export default function SplashScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;
  const loadingWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Loading bar animation
    Animated.timing(loadingWidth, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      router.replace("/home");
    });
  }, []);

  const styles = createStyles(theme);

  // Mini Sudoku grid numbers for the logo
  const gridNumbers = [
    [3, 7, 5],
    [8, 9, null],
    [null, 1, 2],
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity }]}>
        {/* Sudoku Grid Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.gridLogo}>
            {gridNumbers.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.gridRow}>
                {row.map((num, colIndex) => (
                  <View
                    key={colIndex}
                    style={[
                      styles.gridCell,
                      num === 1 && styles.highlightedCell,
                    ]}
                  >
                    {num !== null && (
                      <ThemedText
                        variant="body"
                        weight="bold"
                        color={num === 1 ? "#FFF" : theme.colors.textSecondary}
                        style={styles.gridNumber}
                      >
                        {toBangla(num)}
                      </ThemedText>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Title */}
        <ThemedText variant="h1" weight="bold" style={styles.title}>
          সুডোকু
        </ThemedText>
        <ThemedText variant="body" color={theme.colors.textSecondary}>
          ক্লাসিক পাজল গেম
        </ThemedText>
      </Animated.View>

      {/* Loading Section */}
      <View style={styles.loadingSection}>
        <View style={styles.loadingBarContainer}>
          <Animated.View
            style={[
              styles.loadingBar,
              {
                width: loadingWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "60%"],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.loadingBarContainerSecondary}>
          <Animated.View
            style={[
              styles.loadingBarSecondary,
              {
                width: loadingWidth.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "30%", "50%"],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      alignItems: "center",
      gap: 8,
    },
    logoContainer: {
      marginBottom: 24,
    },
    gridLogo: {
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
      borderRadius: 16,
      padding: 8,
      gap: 4,
    },
    gridRow: {
      flexDirection: "row",
      gap: 4,
    },
    gridCell: {
      width: 28,
      height: 28,
      backgroundColor: theme.colors.surface,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    highlightedCell: {
      backgroundColor: theme.colors.primary,
    },
    gridNumber: {
      fontSize: 14,
    },
    title: {
      fontSize: 48,
      color: theme.colors.text,
      marginTop: 8,
    },
    loadingSection: {
      position: "absolute",
      bottom: 80,
      width: "100%",
      alignItems: "center",
      gap: 12,
    },
    loadingBarContainer: {
      width: 120,
      height: 4,
      backgroundColor: theme.colors.surfaceLight || theme.colors.highlight,
      borderRadius: 2,
      overflow: "hidden",
    },
    loadingBar: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
    },
    loadingBarContainerSecondary: {
      width: 100,
      height: 4,
      backgroundColor: theme.colors.surfaceLight || theme.colors.highlight,
      borderRadius: 2,
      overflow: "hidden",
    },
    loadingBarSecondary: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
      opacity: 0.6,
    },
  });
