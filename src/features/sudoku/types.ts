export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

export interface Cell {
  row: number;
  col: number;
  value: CellValue;
  isFixed: boolean; // Pre-filled cells cannot be changed
  notes: number[]; // Pencil marks
  isValid: boolean; // Highlighting for errors
}

export type Grid = Cell[][];

export interface GameState {
  grid: Grid;
  initialGrid: Grid; // To track fixed cells and reset
  solution: Grid; // To check correctness
  difficulty: Difficulty;
  status: "playing" | "won" | "paused" | "idle";
  mistakes: number;
  timeElapsed: number; // in seconds
  hintsUsed: number;
  history: Grid[]; // For undo/redo (store snapshots)
  historyIndex: number;
}
