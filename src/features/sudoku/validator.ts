import { Grid } from "./types";

/**
 * Checks if placing a number at (row, col) is valid according to Sudoku rules.
 * Does NOT check against the solution, only against the current board state.
 */
export const isValidMove = (
  grid: Grid,
  row: number,
  col: number,
  value: number,
): boolean => {
  // Check Row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c].value === value) return false;
  }

  // Check Column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col].value === value) return false;
  }

  // Check 3x3 Subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c].value === value) return false;
    }
  }

  return true;
};

/**
 * Checks if the board is completely full.
 */
export const isBoardFull = (grid: Grid): boolean => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c].value === null) return false;
    }
  }
  return true;
};

/**
 * Checks if the current grid matches the solution.
 */
export const isGameWon = (grid: Grid, solution: Grid): boolean => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c].value !== solution[r][c].value) return false;
    }
  }
  return true;
};
