import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

export const NumberPad: React.FC = () => {
  const { theme } = useTheme();
  const { inputNumber } = useGameStore();
  const styles = createStyles(theme);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  const handlePress = (num: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
    hapticService.mediumTap();
    inputNumber(num);
  };

  const getKeyStyle = (pressed: boolean) => {
    const baseStyle: any = {
      ...styles.key,
      transform: [{ scale: pressed ? 0.92 : 1 }],
    };

    if (Platform.OS === "ios") {
      baseStyle.shadowColor = theme.colors.primary;
      baseStyle.shadowOffset = { width: 0, height: pressed ? 1 : 3 };
      baseStyle.shadowOpacity = pressed ? 0.1 : 0.15;
      baseStyle.shadowRadius = pressed ? 2 : 6;
    } else {
      baseStyle.elevation = pressed ? 1 : 4;
    }

    return baseStyle;
  };

  return (
    <View style={styles.container}>
      {numbers.map((num) => (
        <Pressable
          key={num}
          style={({ pressed }) => getKeyStyle(pressed)}
          onPress={() => handlePress(num)}
        >
          <ThemedText variant="h2" color={theme.colors.primary} weight="bold">
            {toBangla(num)}
          </ThemedText>
        </Pressable>
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
    },
  });
