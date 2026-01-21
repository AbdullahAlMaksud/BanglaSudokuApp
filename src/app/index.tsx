import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ui/ThemedText";
import { useTheme } from "../styles/ThemeContext";

export default function SplashScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        router.replace("/home");
      }, 1500);
    });
  }, []);

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity }]}>
        <View style={styles.logo}>
          <ThemedText variant="h1" color="#FFF" weight="bold">
            #
          </ThemedText>
        </View>
        <ThemedText variant="h1" weight="bold" style={styles.title}>
          সুডোকু
        </ThemedText>
        <ThemedText variant="body" color={theme.colors.textSecondary}>
          আপনার মস্তিষ্কে প্রশিক্ষণ দিন
        </ThemedText>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          <View
            style={[styles.dot, { backgroundColor: theme.colors.primaryLight }]}
          />
          <View
            style={[styles.dot, { backgroundColor: theme.colors.primaryLight }]}
          />
          <View
            style={[styles.dot, { backgroundColor: theme.colors.primaryLight }]}
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
      gap: theme.spacing.md,
    },
    logo: {
      width: 100,
      height: 100,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.xl,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: 42,
      color: theme.colors.primary,
    },
    footer: {
      position: "absolute",
      bottom: 50,
    },
    dots: {
      flexDirection: "row",
      gap: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });
