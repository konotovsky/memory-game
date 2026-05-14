import { GridItem } from "@/components/GridItem";
import { useGameSession } from "@/stores/gameSessionStore";
import { cn } from "@/utils/cn";
import { useEffect } from "react";

interface GameGridProps {
  size: string;
  playersCount: number;
}

function GameGrid({ size, playersCount }: GameGridProps) {
  const board = useGameSession((state) => state.board);
  const initializeGame = useGameSession((state) => state.initializeGame);

  useEffect(() => {
    if (!board.length) {
      initializeGame(size, playersCount);
    }
  }, [board.length, initializeGame, size, playersCount]);

  return (
    <div
      className={cn(
        "font-atkinson-hyperlegible text-grey-50 grid aspect-square w-full leading-[125%] font-bold",
        {
          "grid-cols-4 gap-[12px] text-[40px] md:gap-300 md:text-[56px]":
            size === "4x4",
          "grid-cols-6 gap-100 text-2xl md:gap-200 md:text-[44px]":
            size === "6x6",
        },
      )}
    >
      {board.map((item) => (
        <GridItem
          key={item.id}
          id={item.id}
          value={item.value}
          revealed={item.revealed}
          matched={item.matched}
        />
      ))}
    </div>
  );
}

export { GameGrid };
