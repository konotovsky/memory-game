import { GameSession } from "@/pages/GameSession";
import { StartGame } from "@/pages/StartGame";
import { useGameSession } from "@/stores/gameSessionStore";

function App() {
  const status = useGameSession((state) => state.status);

  if (status === "idle") {
    return <StartGame />;
  }

  return <GameSession />;
}

export { App };
