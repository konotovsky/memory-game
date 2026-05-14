import { cn } from "@/utils/cn";
import { useGameOptions } from "@/stores/gameOptionsStore";
import { Button } from "@/components/Button";
import { RadioGroup } from "@/components/RadioGroup";
import { RadioGroupItem } from "@/components/RadioGroupItem";
import { useGameSession } from "@/stores/gameSessionStore";

interface StartGameCardProps {
  className?: string;
}

function StartGameCard({ className, ...props }: StartGameCardProps) {
  const theme = useGameOptions((state) => state.theme);
  const players = useGameOptions((state) => state.players);
  const grid = useGameOptions((state) => state.grid);
  const initializeGame = useGameSession((state) => state.initializeGame);

  const setTheme = useGameOptions((state) => state.setTheme);
  const setPlayers = useGameOptions((state) => state.setPlayers);
  const setGrid = useGameOptions((state) => state.setGrid);

  return (
    <div
      className={cn(
        "bg-grey-50 w-full space-y-500 rounded-[10px] p-300 md:space-y-400 md:rounded-[20px] md:px-[54.5px] md:py-[57px]",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-300 md:gap-400">
        <RadioGroup
          value={theme}
          setValue={setTheme}
          name="theme"
          title="Select Theme"
        >
          <RadioGroupItem value="Numbers" />
          <RadioGroupItem value="Icons" />
        </RadioGroup>
        <RadioGroup
          value={players}
          setValue={setPlayers}
          name="players"
          title="Numbers of Players"
          className="md:gap-300"
        >
          <RadioGroupItem value="1" />
          <RadioGroupItem value="2" />
          <RadioGroupItem value="3" />
          <RadioGroupItem value="4" />
        </RadioGroup>
        <RadioGroup
          value={grid}
          setValue={setGrid}
          name="grid"
          title="Grid Size"
        >
          <RadioGroupItem value="4x4" />
          <RadioGroupItem value="6x6" />
        </RadioGroup>
      </div>
      <Button
        onClick={() => initializeGame(grid, Number(players))}
        className="w-full"
      >
        Start Game
      </Button>
    </div>
  );
}

export { StartGameCard };
