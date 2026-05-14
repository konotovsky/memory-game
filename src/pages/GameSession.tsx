import { useEffect } from "react";
import { useGameOptions } from "@/stores/gameOptionsStore";
import { useGameSession } from "@/stores/gameSessionStore";
import { GameGrid } from "@/components/GameGrid";
import { MenuBar } from "@/components/MenuBar";
import { StatCard } from "@/components/StatCard";
import { formatTime } from "@/utils/formatTime";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ResultGameModal } from "@/components/ResultGameModal";

function GameSession() {
  const status = useGameSession((state) => state.status);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const grid = useGameOptions((state) => state.grid);
  const playersCount = Number(useGameOptions((state) => state.players));

  const totalTime = useGameSession((state) => state.totalTime);
  const setTotalTime = useGameSession((state) => state.setTotalTime);

  const players = useGameSession((state) => state.players);
  const currentPlayerIndex = useGameSession(
    (state) => state.currentPlayerIndex,
  );

  useEffect(() => {
    let interval = 0;

    if (status === "playing") {
      interval = setInterval(() => {
        setTotalTime((totalTime) => totalTime + 1);
      }, 1000);
    }

    if (status === "paused" || status === "finished") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [status, setTotalTime]);

  if (!players.length) return null;

  const isSinglePlayer = playersCount === 1;

  const currentPlayer = players[currentPlayerIndex ?? 0];

  return (
    <div className="container mx-auto flex h-dvh flex-col gap-1000 p-300 md:p-600">
      <header>
        <MenuBar />
      </header>

      <main className="flex w-full flex-1 items-center justify-center md:mx-auto md:max-w-[544px]">
        <GameGrid size={grid} playersCount={playersCount} />
      </main>

      <footer className="mx-auto flex w-full items-center gap-300 md:max-w-[544px]">
        {isSinglePlayer ? (
          <>
            <StatCard label="Time" value={formatTime(totalTime)} />
            <StatCard label="Moves" value={String(currentPlayer.moves)} />
          </>
        ) : (
          players.map((player, index) => (
            <StatCard
              className="px-100 md:flex-col md:items-start md:justify-center md:px-200"
              key={player.id}
              label={isDesktop ? `Player ${player.id}` : `P${player.id}`}
              value={String(player.matchedPairs)}
              active={currentPlayerIndex === index}
            />
          ))
        )}
      </footer>
      {status === "finished" && (
        <ResultGameModal
          isSinglePlayer={isSinglePlayer}
          time={formatTime(totalTime)}
          moves={currentPlayer.moves}
        />
      )}
    </div>
  );
}

export { GameSession };
