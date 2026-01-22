import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

interface NumberPadProps {
  inputMode: "numpad" | "single";
}

export const NumberPad: React.FC<NumberPadProps> = ({ inputMode }) => {
  const { theme } = useTheme();
  const { inputNumber, selectedCell, grid, selectedNumber, setSelectedNumber } = useGameStore();
  const styles = createStyles(theme);
  const colors = theme.colors as any;

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  const handlePress = (num: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
    hapticService.mediumTap();

    if (inputMode === "single") {
      // In single mode, toggle the selected number
      if (selectedNumber === num) {
        setSelectedNumber(null); // Deselect if same number
      } else {
        setSelectedNumber(num);
      }
    } else {
      // In numpad mode, directly input the number
      inputNumber(num);
    }
  };

  const handleErase = () => {
    hapticService.lightTap();
    if (inputMode === "single") {
      // In single mode, set selectedNumber to null (erase mode)
      setSelectedNumber(null);
    }
    useGameStore.getState().toggleErase();
  };

  // Get selected cell value to highlight the matching number (numpad mode)
  // In single mode, highlight the selectedNumber
  const highlightedValue = inputMode === "single"
    ? selectedNumber
    : (selectedCell ? grid[selectedCell.row]?.[selectedCell.col]?.value : null);

  const getKeyStyle = (num: number, pressed: boolean) => {
    const isSelected = highlightedValue === num;
    const bgColor = colors.surfaceLight || colors.surface;
    const baseStyle: any = {
      ...styles.key,
      backgroundColor: isSelected ? colors.primary : bgColor,
      transform: [{ scale: pressed ? 0.92 : 1 }],
    };

    if (Platform.OS === "ios" && !isSelected) {
      baseStyle.shadowColor = "#000";
      baseStyle.shadowOffset = { width: 0, height: 2 };
      baseStyle.shadowOpacity = 0.1;
      baseStyle.shadowRadius = 4;
    } else if (!isSelected) {
      baseStyle.elevation = 2;
    }

    return baseStyle;
  };

  return (
    <View style={styles.container}>
      {/* First Row: 1-5 */}
      <View style={styles.row}>
        {numbers.slice(0, 5).map((num) => (
          <Pressable
            key={num}
            style={({ pressed }) => getKeyStyle(num, pressed)}
            onPress={() => handlePress(num)}
          >
            <ThemedText
              variant="h2"
              weight="bold"
              color={highlightedValue === num ? "#FFF" : colors.text}
            >
              {toBangla(num)}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {/* Second Row: 6-9 + Erase */}
      <View style={styles.row}>
        {numbers.slice(5).map((num) => (
          <Pressable
            key={num}
            style={({ pressed }) => getKeyStyle(num, pressed)}
            onPress={() => handlePress(num)}
          >
            <ThemedText
              variant="h2"
              weight="bold"
              color={highlightedValue === num ? "#FFF" : colors.text}
            >
              {toBangla(num)}
            </ThemedText>
          </Pressable>
        ))}
        {/* Erase Button */}
        <Pressable
          style={({ pressed }) => [
            styles.key,
            styles.eraseKey,
            pressed && { transform: [{ scale: 0.92 }] },
          ]}
          onPress={handleErase}
        >
          <Ionicons name="close" size={28} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      gap: 12,
      paddingHorizontal: 8,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
    },
    key: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    eraseKey: {
      backgroundColor: theme.colors.surfaceLight || theme.colors.surface,
    },
  });
