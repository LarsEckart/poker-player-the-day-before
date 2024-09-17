class Player {
  public betRequest(gameState: any, betCallback: (bet: number) => void): void {
    const hasPair = this.hasPair(gameState);
    const hasHighCards = this.hasHighCards(gameState);
    let betAmount = 0;

    if (hasPair) {
      betAmount = gameState.minimum_raise * 2;
    } else if (hasHighCards) {
      betAmount = gameState.minimum_raise;
    }

    betCallback(betAmount);
  }

  public showdown(gameState: any): void {
    // Implement showdown logic if needed
  }

  public hasPair(gameState: any): boolean {
    const player = gameState.players.find((p: any) => p.id === gameState.in_action);
    if (!player || !player.hole_cards || player.hole_cards.length !== 2) {
      return false;
    }

    const [card1, card2] = player.hole_cards;
    return card1.rank === card2.rank;
  }

  public hasHighCards(gameState: any): boolean {
    const highCardRanks = ['10', 'J', 'Q', 'K', 'A'];
    const player = gameState.players.find((p: any) => p.id === gameState.in_action);
    if (!player || !player.hole_cards || player.hole_cards.length !== 2) {
      return false;
    }

    const [card1, card2] = player.hole_cards;
    return highCardRanks.includes(card1.rank) && highCardRanks.includes(card2.rank);
  }
}

export default Player;