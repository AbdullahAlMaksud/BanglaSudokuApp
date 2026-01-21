import { CellValue, Grid } from "./types";
import { isValidMove } from "./validator";

/**
 * Solves the Sudoku grid using backtracking.
 * Modifies the grid in-place.
 * @returns true if solvable, false otherwise.
 */
export const solveGrid = (grid: Grid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        // Try digits 1-9
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Randomize order for random board generation
        shuffleArray(nums);

        for (const num of nums) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col].value = num as CellValue;

            if (solveGrid(grid)) return true;

            grid[row][col].value = null; // Backtrack
          }
        }
        return false; // No valid number found
      }
    }
  }
  return true; // Filled completely
};

/**
 * Validates if the grid has a unique solution.
 * Uses backtracking to count solutions (stops if > 1).
 */
export const hasUniqueSolution = (grid: Grid): boolean => {
  let solutions = 0;

  const solve = (g: Grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (g[row][col].value === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(g, row, col, num)) {
              g[row][col].value = num as CellValue;
              solve(g);
              g[row][col].value = null;
              if (solutions > 1) return;
            }
          }
          return;
        }
      }
    }
    solutions++;
  };

  // Clone grid to avoid mutating the original checking grid
  const gridCopy = JSON.parse(JSON.stringify(grid));
  solve(gridCopy);
  return solutions === 1;
};

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
