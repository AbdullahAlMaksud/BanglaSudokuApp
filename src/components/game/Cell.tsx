import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Cell as CellType } from "../../features/sudoku/types";
import { useTheme } from "../../styles/ThemeContext";
import { toBangla } from "../../utils/bangla";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  isSameNumber: boolean;
  isHighlighted: boolean;
  onPress: () => void;
}

export const Cell: React.FC<CellProps> = ({
  cell,
  isSelected,
  isSameNumber,
  isHighlighted,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePress = () => {
    hapticService.lightTap();
    onPress();
  };

  const colors = theme.colors as any;

  const getBackgroundColor = () => {
    if (isSelected) return colors.primary;
    if (cell.isValid === false) return colors.error + "30";
    if (isHighlighted) return colors.cellHighlight || colors.highlight;
    if (isSameNumber && cell.value !== null) return colors.primary + "20";
    return colors.boardBackground || colors.surface;
  };

  const getTextColor = () => {
    if (isSelected) return "#FFFFFF";
    if (cell.isValid === false) return colors.error;
    if (cell.isFixed) return colors.textSecondary;
    return colors.text;
  };

  const getCellStyle = (pressed: boolean) => {
    const baseStyle: any = {
      ...styles.container,
      backgroundColor: getBackgroundColor(),
      transform: [{ scale: pressed ? 0.95 : 1 }],
    };

    // Cyan border for 3x3 box boundaries
    const isRightBorder = (cell.col + 1) % 3 === 0 && cell.col !== 8;
    const isBottomBorder = (cell.row + 1) % 3 === 0 && cell.row !== 8;

    if (isRightBorder) {
      baseStyle.borderRightWidth = 2;
      baseStyle.borderRightColor = colors.primary;
    }
    if (isBottomBorder) {
      baseStyle.borderBottomWidth = 2;
      baseStyle.borderBottomColor = colors.primary;
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
          variant="h3"
          weight={cell.isFixed ? "regular" : "bold"}
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
                fontSize: 7,
                color: cell.notes.includes(num)
                  ? colors.primary
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
      aspectRatio: 1,
      borderWidth: 0.5,
      borderColor: theme.colors.boardLine || theme.colors.border,
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
