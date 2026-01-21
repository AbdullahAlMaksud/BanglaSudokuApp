import React from "react";
import { StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import { useTheme } from "../../styles/ThemeContext";
import { Cell } from "./Cell";

export const Board: React.FC = () => {
  const { theme } = useTheme();
  const { grid, selectedCell, selectCell } = useGameStore();
  const styles = createStyles(theme);

  if (!grid || grid.length === 0) return null;

  const selectedValue =
    selectedCell && grid[selectedCell.row][selectedCell.col].value;

  return (
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
              onPress={() => selectCell(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    board: {
      borderWidth: 2,
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    row: {
      flexDirection: "row",
    },
  });
