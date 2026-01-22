import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { generateSudoku } from "../features/sudoku/generator";
import {
  CellValue,
  Difficulty,
  GameState,
  Grid,
} from "../features/sudoku/types";
import { isGameWon } from "../features/sudoku/validator";
import hapticService from "../utils/hapticService";
import soundService from "../utils/soundService";
import { useStatsStore } from "./statsStore";

interface GameActions {
  startGame: (difficulty: Difficulty) => void;
  selectCell: (row: number, col: number) => void;
  inputNumber: (num: CellValue) => void;
  toggleNote: () => void;
  toggleErase: () => void;
  undo: () => void;
  hint: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  quitGame: () => void;
  tick: () => void;
  setNoteMode: (active: boolean) => void;
  setSelectedNumber: (num: CellValue | null) => void;
}

interface ExtendedGameState extends GameState {
  selectedCell: { row: number; col: number } | null;
  isNoteMode: boolean;
  selectedNumber: CellValue | null;
}

const INITIAL_STATE: ExtendedGameState = {
  grid: [],
  initialGrid: [],
  solution: [],
  difficulty: "Easy",
  status: "idle",
  mistakes: 0,
  timeElapsed: 0,
  hintsUsed: 0,
  history: [],
  historyIndex: -1,
  selectedCell: null,
  isNoteMode: false,
  selectedNumber: null,
};

export const useGameStore = create<ExtendedGameState & GameActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      startGame: (difficulty) => {
        const { initial, solved } = generateSudoku(difficulty);

        // Play start sound & haptic
        soundService.playSounds.start();
        hapticService.success();

        set({
          ...INITIAL_STATE,
          grid: JSON.parse(JSON.stringify(initial)),
          initialGrid: JSON.parse(JSON.stringify(initial)),
          solution: solved,
          difficulty,
          status: "playing",
          history: [JSON.parse(JSON.stringify(initial))],
          historyIndex: 0,
        });
      },

      selectCell: (row, col) => set({ selectedCell: { row, col } }),

      setNoteMode: (active) => set({ isNoteMode: active }),

      setSelectedNumber: (num) => set({ selectedNumber: num }),

      toggleNote: () => {
        // Play note toggle sound & haptic
        soundService.playSounds.note();
        hapticService.selection();
        set((state) => ({ isNoteMode: !state.isNoteMode }));
      },

      toggleErase: () => {
        const { grid, selectedCell, history, historyIndex, initialGrid } =
          get();
        if (!selectedCell) return;
        const { row, col } = selectedCell;

        if (initialGrid[row][col].isFixed) return;

        // Light haptic for erase
        hapticService.lightTap();

        const newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[row][col].value = null;
        newGrid[row][col].notes = [];
        newGrid[row][col].isValid = true;

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(newGrid)));

        set({
          grid: newGrid,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      inputNumber: (num) => {
        const {
          grid,
          selectedCell,
          isNoteMode,
          solution,
          mistakes,
          status,
          history,
          historyIndex,
          initialGrid,
        } = get();
        if (status !== "playing" || !selectedCell || !num) return;
        const { row, col } = selectedCell;

        if (initialGrid[row][col].isFixed) return;

        const newGrid: Grid = JSON.parse(JSON.stringify(grid));
        const cell = newGrid[row][col];

        if (isNoteMode) {
          // Toggle note
          if (cell.notes.includes(num)) {
            cell.notes = cell.notes.filter((n) => n !== num);
          } else {
            cell.notes.push(num);
          }
          // Light tap for note
          soundService.playSounds.tap();
          hapticService.lightTap();
        } else {
          const isCorrect = solution[row][col].value === num;

          cell.value = num;
          cell.notes = [];

          if (!isCorrect) {
            set({ mistakes: mistakes + 1 });
            cell.isValid = false;
            // Error feedback
            soundService.playSounds.error();
            hapticService.error();
          } else {
            cell.isValid = true;
            // Correct feedback
            soundService.playSounds.correct();
            hapticService.success();
          }
        }

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(newGrid)));

        set({
          grid: newGrid,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });

        // Check Win
        if (!isNoteMode && isGameWon(newGrid, solution)) {
          set({ status: "won" });
          // Win celebration feedback
          soundService.playSounds.win();
          hapticService.success();
          // Update Stats Store
          useStatsStore.getState().addGameResult({
            difficulty: get().difficulty,
            won: true,
            time: get().timeElapsed,
            mistakes: get().mistakes,
          });
        }
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          // Undo feedback
          soundService.playSounds.undo();
          hapticService.warning();
          set({
            grid: JSON.parse(JSON.stringify(history[historyIndex - 1])),
            historyIndex: historyIndex - 1,
          });
        }
      },

      hint: () => {
        const { grid, solution, selectedCell, hintsUsed, status } = get();
        if (status !== "playing" || !selectedCell) return;
        const { row, col } = selectedCell;

        if (grid[row][col].value !== null) return;

        // Hint feedback
        soundService.playSounds.hint();
        hapticService.warning();

        const newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[row][col].value = solution[row][col].value;
        newGrid[row][col].isValid = true;
        newGrid[row][col].isFixed = true;

        set({
          grid: newGrid,
          hintsUsed: hintsUsed + 1,
        });
      },

      pauseGame: () => set({ status: "paused" }),
      resumeGame: () => set({ status: "playing" }),

      resetGame: () => {
        const { initialGrid } = get();
        // Start feedback
        soundService.playSounds.start();
        hapticService.mediumTap();
        set({
          grid: JSON.parse(JSON.stringify(initialGrid)),
          status: "playing",
          mistakes: 0,
          timeElapsed: 0,
          history: [JSON.parse(JSON.stringify(initialGrid))],
          historyIndex: 0,
        });
      },

      quitGame: () => set({ status: "idle", grid: [] }),

      tick: () => {
        const { status, timeElapsed } = get();
        if (status === "playing") {
          set({ timeElapsed: timeElapsed + 1 });
        }
      },
    }),
    {
      name: "sudoku-game-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        grid: state.grid,
        initialGrid: state.initialGrid,
        solution: state.solution,
        difficulty: state.difficulty,
        status: state.status,
        mistakes: state.mistakes,
        timeElapsed: state.timeElapsed,
        history: state.history,
        historyIndex: state.historyIndex,
      }),
    },
  ),
);
