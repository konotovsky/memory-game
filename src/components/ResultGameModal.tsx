import { Button } from "@/components/Button";
import { useGameSession } from "@/stores/gameSessionStore";
import { cn } from "@/utils/cn";

interface ResultGameModalProps {
  isSinglePlayer: boolean;
  time: string;
  moves: number;
}

function ResultGameModal({
  isSinglePlayer,
  time,
  moves,
}: ResultGameModalProps) {
  const restartGame = useGameSession((state) => state.restartGame);
  const newGame = useGameSession((state) => state.newGame);
  const players = useGameSession((state) => state.players);

  const maxPairs = Math.max(...players.map((player) => player.matchedPairs));

  const winners = players.filter((player) => player.matchedPairs === maxPairs);

  const resultTitle =
    winners.length === 1 ? `${winners[0].name} Wins!` : "It`s a tie!";

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 p-300">
      <div className="font-atkinson-hyperlegible flex w-full flex-col gap-300 rounded-[10px] bg-white p-300 leading-[125%] font-bold md:max-w-[654px] md:rounded-[20px] md:p-600">
        {isSinglePlayer ? (
          <>
            <div className="space-y-100 text-center md:space-y-200">
              <h1 className="text-2xl text-blue-950 md:text-5xl">
                You did it!
              </h1>
              <p className="text-sm text-blue-400 md:text-[18px]">
                Game over! Here’s how you got on…
              </p>
            </div>
            <div className="flex flex-col gap-100 text-sm text-blue-400 md:gap-200 md:text-[18px]">
              <div className="flex items-center justify-between rounded-[5px] bg-blue-100 px-200 py-100 md:rounded-[10px] md:px-400 md:py-200">
                <h2>Time Elapsed</h2>
                <p className="text-[20px] text-blue-800 md:text-[32px]">
                  {time}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-[5px] bg-blue-100 px-200 py-100 md:rounded-[10px] md:px-400 md:py-200">
                <h2>Moves Taken</h2>
                <p className="text-[20px] text-blue-800 md:text-[32px]">
                  {moves}
                </p>
              </div>
            </div>
            <div className="space-y-200 md:flex md:gap-200">
              <Button
                className="w-full md:h-[52px] md:w-1/2 md:text-[20px]"
                onClick={restartGame}
              >
                Restart
              </Button>
              <Button
                onClick={newGame}
                className="hover:bg-blue-350 w-full bg-blue-100 text-blue-800 hover:text-white md:h-[52px] md:w-1/2 md:text-[20px]"
              >
                Setup New Game
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-100 text-center md:space-y-200">
              <h1 className="text-2xl text-blue-950 md:text-5xl">
                {resultTitle}
              </h1>
              <p className="text-sm text-blue-400 md:text-[18px]">
                Game over! Here are the results…
              </p>
            </div>
            <div className="flex flex-col gap-100 text-sm text-blue-400 md:gap-200 md:text-[18px]">
              {players
                .sort(
                  (playerA, playerB) =>
                    playerB.matchedPairs - playerA.matchedPairs,
                )
                .map((player) => (
                  <div
                    key={player.id}
                    className={cn(
                      "flex items-center justify-between rounded-[5px] bg-blue-100 px-200 py-100 md:rounded-[10px] md:px-400 md:py-200",
                      {
                        "bg-blue-950 text-white":
                          player.matchedPairs === maxPairs,
                      },
                    )}
                  >
                    <h2>
                      {player.name}{" "}
                      {player.matchedPairs === maxPairs && "(Winner!)"}
                    </h2>
                    <p
                      className={cn(
                        "text-[20px] text-blue-800 md:text-[32px]",
                        {
                          "text-white": player.matchedPairs === maxPairs,
                        },
                      )}
                    >
                      {player.matchedPairs} Pairs
                    </p>
                  </div>
                ))}
            </div>
            <div className="space-y-200 md:flex md:gap-200">
              <Button
                className="w-full md:h-[52px] md:w-1/2 md:text-[20px]"
                onClick={restartGame}
              >
                Restart
              </Button>
              <Button
                onClick={newGame}
                className="hover:bg-blue-350 w-full bg-blue-100 text-blue-800 hover:text-white md:h-[52px] md:w-1/2 md:text-[20px]"
              >
                Setup New Game
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { ResultGameModal };
