import { useGameSession } from "@/stores/gameSessionStore";
import { Button } from "@/components/Button";

interface MenuModalProps {
  onClose: () => void;
}

function MenuModal({ onClose }: MenuModalProps) {
  const restartGame = useGameSession((state) => state.restartGame);
  const newGame = useGameSession((state) => state.newGame);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 p-300 md:hidden">
      <div className="flex w-full flex-col gap-200 rounded-[10px] bg-white p-300">
        <Button
          onClick={() => {
            restartGame();
            onClose();
          }}
        >
          Restart
        </Button>
        <Button
          onClick={newGame}
          className="hover:bg-blue-350 bg-blue-100 text-blue-800 hover:text-white"
        >
          New Game
        </Button>
        <Button
          onClick={onClose}
          className="hover:bg-blue-350 bg-blue-100 text-blue-800 hover:text-white"
        >
          Resume Game
        </Button>
      </div>
    </div>
  );
}

export { MenuModal };
