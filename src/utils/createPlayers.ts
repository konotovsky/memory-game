function createPlayers(playersCount: number) {
  return Array.from({ length: playersCount }, (_, index) => ({
    id: index + 1,
    name: `Player ${index + 1}`,
    moves: 0,
    matchedPairs: 0,
  }));
}

export { createPlayers };
