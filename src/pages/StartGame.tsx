import { Logo } from "@/components/Logo";
import { StartGameCard } from "@/components/StartGameCard";

function StartGame() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-600 bg-blue-950 px-300 md:gap-1000">
      <Logo className="h-400 md:h-500" />
      <StartGameCard className="md:max-w-[654px]" />
    </main>
  );
}

export { StartGame };
