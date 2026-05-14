import type { ReactNode } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createBoard } from "@/utils/createBoard";
import { createPlayers } from "@/utils/createPlayers";

type GameStatus = "idle" | "playing" | "paused" | "finished";

interface BoardItem {
  id: string;
  value: ReactNode;
  revealed: boolean;
  matched: boolean;
}

interface Player {
  id: number;
  name: string;
  moves: number;
  matchedPairs: number;
}

interface GameSessionState {
  status: GameStatus;

  board: BoardItem[];
  selectedItems: string[];

  players: Player[];
  currentPlayerIndex: number;
  totalTime: number;

  initializeGame: (size: string, playersCount: number) => void;
  revealItem: (itemId: string) => void;
  restartGame: () => void;
  newGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setTotalTime: (totalTime: number | ((totalTime: number) => number)) => void;
}

const useGameSession = create<GameSessionState>()(
  persist(
    (set, get) => ({
      status: "idle",

      board: [],
      players: [],
      currentPlayerIndex: 0,
      selectedItems: [],

      initializeGame: (size, playersCount) => {
        set({
          board: createBoard(size),
          players: createPlayers(playersCount),
          currentPlayerIndex: 0,
          selectedItems: [],
          status: "playing",
          totalTime: 0,
        });
      },

      totalTime: 0,
      setTotalTime: (totalTime) =>
        set((state) => ({
          totalTime:
            typeof totalTime === "function"
              ? totalTime(state.totalTime)
              : totalTime,
        })),

      revealItem: (itemId) => {
        const { board, selectedItems, players, currentPlayerIndex } = get();

        if (selectedItems.length === 2) return;

        const clicked = board.find((item) => item.id === itemId);
        if (!clicked || clicked.revealed || clicked.matched) return;

        const updatedBoard = board.map((item) =>
          item.id === itemId ? { ...item, revealed: true } : item,
        );

        const updatedSelected = [...selectedItems, itemId];

        set({
          board: updatedBoard,
          selectedItems: updatedSelected,
        });

        if (updatedSelected.length !== 2) return;

        const [a, b] = updatedSelected;

        const first = updatedBoard.find((item) => item.id === a);
        const second = updatedBoard.find((item) => item.id === b);

        if (!first || !second) return;

        const isSinglePlayer = players.length === 1;

        const updatedPlayers = [...players];
        const current = updatedPlayers[currentPlayerIndex];

        updatedPlayers[currentPlayerIndex] = {
          ...current,
          moves: current.moves + 1,
        };

        const isMatch = first.value === second.value;

        if (isMatch) {
          const newBoard = updatedBoard.map((item) =>
            item.id === a || item.id === b ? { ...item, matched: true } : item,
          );

          updatedPlayers[currentPlayerIndex] = {
            ...updatedPlayers[currentPlayerIndex],
            matchedPairs: updatedPlayers[currentPlayerIndex].matchedPairs + 1,
          };

          const finished = newBoard.every((item) => item.matched);

          set({
            board: newBoard,
            players: updatedPlayers,
            selectedItems: [],
            status: finished ? "finished" : "playing",
          });

          return;
        }

        set({
          players: updatedPlayers,
        });

        setTimeout(() => {
          const boardNow = get().board;

          const hidden = boardNow.map((item) =>
            updatedSelected.includes(item.id)
              ? { ...item, revealed: false }
              : item,
          );

          const nextIndex = (currentPlayerIndex + 1) % players.length;

          const nextPlayers = [...get().players];

          if (!isSinglePlayer) {
            nextPlayers[nextIndex] = {
              ...nextPlayers[nextIndex],
            };
          }

          set({
            board: hidden,
            selectedItems: [],
            players: nextPlayers,
            currentPlayerIndex: nextIndex,
          });
        }, 1000);
      },

      restartGame: () => {
        const playersCount = get().players.length;
        const boardSize = get().board.length === 16 ? "4x4" : "6x6";

        set({
          board: createBoard(boardSize),
          players: createPlayers(playersCount),
          currentPlayerIndex: 0,
          selectedItems: [],
          status: "playing",
          totalTime: 0,
        });
      },

      newGame: () => {
        set({
          board: [],
          players: [],
          currentPlayerIndex: 0,
          selectedItems: [],
          status: "idle",
          totalTime: 0,
        });
      },

      pauseGame: () => {
        const { status } = get();

        if (status !== "finished") {
          set({
            status: "paused",
          });
        }
      },

      resumeGame: () => {
        const { status } = get();

        if (status !== "finished") {
          set({ status: "playing" });
        }
      },
    }),
    {
      name: "memory-game-session",
    },
  ),
);

export { useGameSession };
