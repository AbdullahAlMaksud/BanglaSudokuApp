import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import { ThemedText } from "../ui/ThemedText";

export const NumberPad: React.FC = () => {
  const { theme } = useTheme();
  const { inputNumber } = useGameStore();
  const styles = createStyles(theme);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  return (
    <View style={styles.container}>
      {numbers.map((num) => (
        <TouchableOpacity
          key={num}
          style={styles.key}
          onPress={() => inputNumber(num)}
        >
          <ThemedText variant="h2" color={theme.colors.primary} weight="bold">
            {toBangla(num)}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: theme.spacing.sm,
      marginTop: theme.spacing.lg,
    },
    key: {
      width: "18%",
      aspectRatio: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  });
