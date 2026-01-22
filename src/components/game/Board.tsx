import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import { Cell } from "./Cell";

interface BoardProps {
  inputMode: "numpad" | "single";
}

export const Board: React.FC<BoardProps> = ({ inputMode }) => {
  const { theme } = useTheme();
  const { grid, selectedCell, selectCell, selectedNumber, inputNumber } = useGameStore();
  const styles = createStyles(theme);

  if (!grid || grid.length === 0) return null;

  const selectedValue =
    selectedCell && grid[selectedCell.row][selectedCell.col].value;

  // Check if cell is in same row or column as selected
  const isHighlighted = (rowIndex: number, colIndex: number) => {
    if (!selectedCell) return false;
    return (
      selectedCell.row === rowIndex ||
      selectedCell.col === colIndex ||
      (Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
        Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3))
    );
  };

  const handleCellPress = (rowIndex: number, colIndex: number) => {
    selectCell(rowIndex, colIndex);

    // In single number mode, if a number is selected, input it
    if (inputMode === "single" && selectedNumber !== null) {
      // Small delay to ensure cell is selected first
      setTimeout(() => {
        inputNumber(selectedNumber);
      }, 10);
    }
  };

  return (
    <View style={styles.boardWrapper}>
      <View style={styles.board}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                isSelected={
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                }
                isSameNumber={
                  selectedValue !== null &&
                  selectedValue !== undefined &&
                  cell.value === selectedValue
                }
                isHighlighted={isHighlighted(rowIndex, colIndex)}
                onPress={() => handleCellPress(rowIndex, colIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    boardWrapper: {
      borderRadius: 12,
      overflow: "hidden",
      ...(Platform.OS === "ios"
        ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        }
        : { elevation: 4 }),
    },
    board: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.boardBackground || theme.colors.surface,
      borderRadius: 12,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
    },
  });
