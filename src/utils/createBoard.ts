import { shuffle } from "@/utils/shuffle";

function createBoard(size: string) {
  const [rows, cols] = size.split("x").map(Number);

  const totalItems = rows * cols;
  const pairsCount = totalItems / 2;

  const items = Array.from({ length: pairsCount }).flatMap((_, index) => {
    const value = index + 1;

    return [
      { id: `${value}-a`, value, revealed: false, matched: false },
      { id: `${value}-b`, value, revealed: false, matched: false },
    ];
  });

  return shuffle(items);
}

export { createBoard };
