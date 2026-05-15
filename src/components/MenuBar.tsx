import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { MenuModal } from "@/components/MenuModal";
import { useGameSession } from "@/stores/gameSessionStore";

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  const restartGame = useGameSession((state) => state.restartGame);
  const newGame = useGameSession((state) => state.newGame);
  const pauseGame = useGameSession((state) => state.pauseGame);
  const resumeGame = useGameSession((state) => state.resumeGame);

  return (
    <>
      <div className="flex items-center justify-between">
        <Logo className="h-300 w-fit text-blue-950 md:h-500" />
        <Button
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
            pauseGame();
          }}
          className="h-500 md:hidden"
        >
          Menu
        </Button>
        <div className="hidden md:flex md:items-center md:justify-between md:gap-200">
          <Button onClick={restartGame} className="md:h-[52px] md:text-xl">
            Restart
          </Button>
          <Button
            onClick={newGame}
            className="hover:bg-blue-350 bg-blue-100 text-blue-800 hover:text-white md:h-[52px] md:text-xl"
          >
            New Game
          </Button>
        </div>
      </div>
      {isOpen && (
        <MenuModal
          onClose={() => {
            setIsOpen(false);
            resumeGame();
          }}
        />
      )}
    </>
  );
}

export { MenuBar };
