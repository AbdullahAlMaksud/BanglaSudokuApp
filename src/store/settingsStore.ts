import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Language = "bn" | "en";

interface SettingsState {
  theme: "light" | "dark" | "system";
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  errorHighlight: boolean;
  language: Language;

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSound: () => void;
  toggleVibration: () => void;
  toggleErrorHighlight: () => void;
  setLanguage: (lang: Language) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "system",
      soundEnabled: true,
      vibrationEnabled: true,
      errorHighlight: true,
      language: "bn",

      setTheme: (theme) => {
        set({ theme });
        // Theme is now handled by React Context (ThemeProvider)
      },
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleVibration: () =>
        set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
      toggleErrorHighlight: () =>
        set((state) => ({ errorHighlight: !state.errorHighlight })),
      setLanguage: (language) => set({ language }),
      resetSettings: () =>
        set({
          theme: "system",
          soundEnabled: true,
          vibrationEnabled: true,
          errorHighlight: true,
          language: "bn",
        }),
    }),
    {
      name: "sudoku-settings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
