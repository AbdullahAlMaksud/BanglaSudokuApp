import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Cell as CellType } from "../../features/sudoku/types";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  isSameNumber: boolean;
  onPress: () => void;
}

export const Cell: React.FC<CellProps> = ({
  cell,
  isSelected,
  isSameNumber,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePress = () => {
    hapticService.lightTap();
    onPress();
  };

  const getBackgroundColor = () => {
    if (isSelected) return theme.colors.primary;
    if (cell.isValid === false) return theme.colors.error + "40";
    if (isSameNumber && cell.value !== null)
      return theme.colors.primaryLight + "40";
    return theme.colors.surface;
  };

  const getTextColor = () => {
    if (isSelected) return "#FFFFFF";
    if (cell.isValid === false) return theme.colors.error;
    if (cell.isFixed) return theme.colors.text;
    return theme.colors.primary;
  };

  const getCellStyle = (pressed: boolean) => {
    const baseStyle: any = {
      ...styles.container,
      backgroundColor: getBackgroundColor(),
      transform: [{ scale: pressed ? 0.95 : 1 }],
    };

    // Add glow effect for selected cell
    if (isSelected) {
      if (Platform.OS === "ios") {
        baseStyle.shadowColor = theme.colors.primary;
        baseStyle.shadowOffset = { width: 0, height: 0 };
        baseStyle.shadowOpacity = 0.5;
        baseStyle.shadowRadius = 8;
      } else {
        baseStyle.elevation = 6;
      }
    }

    // Border styles for grid
    if ((cell.col + 1) % 3 === 0 && cell.col !== 8) {
      baseStyle.borderRightWidth = 2;
      baseStyle.borderRightColor = theme.colors.text;
    }
    if ((cell.row + 1) % 3 === 0 && cell.row !== 8) {
      baseStyle.borderBottomWidth = 2;
      baseStyle.borderBottomColor = theme.colors.text;
    }

    return baseStyle;
  };

  return (
    <Pressable
      style={({ pressed }) => getCellStyle(pressed)}
      onPress={handlePress}
    >
      {cell.value !== null ? (
        <ThemedText
          variant="h2"
          weight={cell.isFixed ? "bold" : "regular"}
          style={{ color: getTextColor() }}
        >
          {toBangla(cell.value)}
        </ThemedText>
      ) : (
        <View style={styles.notesContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <ThemedText
              key={num}
              variant="caption"
              style={{
                width: "33%",
                textAlign: "center",
                fontSize: 8,
                color: cell.notes.includes(num)
                  ? theme.colors.textSecondary
                  : "transparent",
              }}
            >
              {toBangla(num)}
            </ThemedText>
          ))}
        </View>
      )}
    </Pressable>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: "11.11%",
      height: 40,
      aspectRatio: 1,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    notesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignContent: "center",
    },
  });
