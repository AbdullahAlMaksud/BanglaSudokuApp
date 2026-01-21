import { hasUniqueSolution, solveGrid } from "./solver";
import { Difficulty, Grid } from "./types";

const createEmptyGrid = (): Grid => {
  return Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => ({
      row,
      col,
      value: null,
      isFixed: false,
      notes: [],
      isValid: true,
    })),
  );
};

export const generateSudoku = (
  difficulty: Difficulty,
): { initial: Grid; solved: Grid } => {
  const grid = createEmptyGrid();

  // 1. Fill diagonal 3x3 boxes (independent)
  fillDiagonalBoxes(grid);

  // 2. Solve the rest to get a complete valid board
  solveGrid(grid);

  // Clone fully solved grid
  const solvedGrid: Grid = JSON.parse(JSON.stringify(grid));

  // 3. Remove digits based on difficulty
  removeDigits(grid, difficulty);

  return { initial: grid, solved: solvedGrid };
};

const fillDiagonalBoxes = (grid: Grid) => {
  for (let i = 0; i < 9; i = i + 3) {
    fillBox(grid, i, i);
  }
};

const fillBox = (grid: Grid, startRow: number, startCol: number) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Shuffle
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  let idx = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      grid[startRow + row][startCol + col].value = nums[idx++] as any;
      grid[startRow + row][startCol + col].isFixed = true;
    }
  }
};

const removeDigits = (grid: Grid, difficulty: Difficulty) => {
  let attempts = 0;
  const maxAttempts = 10; // Avoid infinite loops if stuck

  let cellsToRemove = 40; // Default
  switch (difficulty) {
    case "Easy":
      cellsToRemove = 43;
      break; // 38 clues
    case "Medium":
      cellsToRemove = 51;
      break; // 30 clues
    case "Hard":
      cellsToRemove = 56;
      break; // 25 clues
    case "Expert":
      cellsToRemove = 61;
      break; // 20 clues
  }

  while (cellsToRemove > 0 && attempts < maxAttempts) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);

    if (grid[row][col].value !== null) {
      const backup = grid[row][col].value;
      grid[row][col].value = null;
      grid[row][col].isFixed = false;

      // Ensure unique solution
      if (!hasUniqueSolution(grid)) {
        grid[row][col].value = backup; // Restore
        grid[row][col].isFixed = true;
        attempts++; // Count failed attempt
      } else {
        cellsToRemove--;
        attempts = 0; // Reset attempts after success
      }
    }
  }
};
