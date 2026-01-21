import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightAction,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          {title && (
            <ThemedText variant="h2" weight="bold" align="center">
              {title}
            </ThemedText>
          )}
        </View>

        <View style={styles.right}>{rightAction}</View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background,
    },
    container: {
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: theme.spacing.md,
      justifyContent: "space-between",
    },
    left: {
      width: 40,
      alignItems: "flex-start",
    },
    center: {
      flex: 1,
      alignItems: "center",
    },
    right: {
      width: 40,
      alignItems: "flex-end",
    },
    backButton: {
      padding: 4,
    },
  });
