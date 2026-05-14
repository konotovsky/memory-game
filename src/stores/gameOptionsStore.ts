import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameOptionsState {
  theme: string;
  players: string;
  grid: string;

  setTheme: (theme: GameOptionsState["theme"]) => void;
  setPlayers: (players: GameOptionsState["players"]) => void;
  setGrid: (grid: GameOptionsState["grid"]) => void;
}

const useGameOptions = create<GameOptionsState>()(
  persist(
    (set) => ({
      theme: "Numbers",
      players: "1",
      grid: "4x4",

      setTheme: (theme) => set({ theme }),
      setPlayers: (players) => set({ players }),
      setGrid: (grid) => set({ grid }),
    }),
    {
      name: "memory-game-options",
    },
  ),
);

export { useGameOptions };
