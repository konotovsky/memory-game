import { useGameOptions } from "@/stores/gameOptionsStore";
import { useGameSession } from "@/stores/gameSessionStore";
import { cn } from "@/utils/cn";
import type { ReactNode } from "react";
import { iconsMap } from "@/utils/iconsMap";

interface GridItemProps {
  id: string;
  value: ReactNode;
  revealed: boolean;
  matched: boolean;
}

function GridItem({ id, value, revealed, matched }: GridItemProps) {
  const revealItem = useGameSession((state) => state.revealItem);
  const theme = useGameOptions((state) => state.theme);

  return (
    <div
      onClick={() => revealItem(id)}
      className={cn(
        "hover:bg-blue-350 relative flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-blue-800",
        {
          "bg-orange-400 hover:bg-orange-400": revealed,
          "bg-blue-300 hover:bg-blue-300": matched,
        },
      )}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center opacity-0",
          {
            "opacity-100": revealed || matched,
          },
        )}
      >
        {theme === "Numbers" ? value : iconsMap[value as keyof typeof iconsMap]}
      </span>
    </div>
  );
}

export { GridItem };
