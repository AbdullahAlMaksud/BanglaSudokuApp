import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Difficulty } from "../features/sudoku/types";

export interface GameRecord {
  id: string;
  date: string;
  difficulty: Difficulty;
  time: number;
  mistakes: number;
  won: boolean;
}

interface StatsState {
  gamesPlayed: number;
  wins: number;
  bestTimes: Record<Difficulty, number | null>;
  recentGames: GameRecord[];

  addGameResult: (result: Omit<GameRecord, "id" | "date">) => void;
  resetStats: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      gamesPlayed: 0,
      wins: 0,
      bestTimes: { Easy: null, Medium: null, Hard: null, Expert: null },
      recentGames: [],

      addGameResult: (result) => {
        const { gamesPlayed, wins, bestTimes, recentGames } = get();

        const newRecord: GameRecord = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          ...result,
        };

        const newBestTime =
          result.won &&
          (!bestTimes[result.difficulty] ||
            result.time < bestTimes[result.difficulty]!)
            ? result.time
            : bestTimes[result.difficulty];

        set({
          gamesPlayed: gamesPlayed + 1,
          wins: result.won ? wins + 1 : wins,
          bestTimes: {
            ...bestTimes,
            [result.difficulty]: newBestTime,
          },
          recentGames: [newRecord, ...recentGames].slice(0, 20), // Keep last 20
        });
      },

      resetStats: () =>
        set({
          gamesPlayed: 0,
          wins: 0,
          bestTimes: { Easy: null, Medium: null, Hard: null, Expert: null },
          recentGames: [],
        }),
    }),
    {
      name: "sudoku-stats",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
