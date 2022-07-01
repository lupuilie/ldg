export interface IGameBox {
  index: number;
  selected: Player | null;
}

export type Player = "X" | "O";

class Game {
  public table: IGameBox[];
  public currentPlayer: Player;

  constructor() {
    this.table = Game.createBoxes();
    this.currentPlayer = Game.getRandomPlayer();
  }

  private getNextPlayer(): Player {
    if (this.currentPlayer === "X") return "O";
    return "X";
  }

  public checkWinner(): Player | null {
    for (let positions of Game.winnerPositions) {
      const inGamePositions = positions.map((pos) => this.table[pos].selected);
      const winner = Game.isWinningPosition(inGamePositions as Player[]);
      if (winner) return inGamePositions[0];
    }
    return null;
  }

  public onPlayerSelection(index: number) {
    if (this.table[index].selected !== null) return;

    this.table[index].selected = this.currentPlayer;
    this.currentPlayer = this.getNextPlayer();
  }

  static createEmptyBox(index: number): IGameBox {
    return { index, selected: null };
  }
  static getRandomPlayer(): Player {
    return Math.round(Math.random()) ? "X" : "O";
  }
  static createBoxes(): IGameBox[] {
    return Array(9)
      .fill(0)
      .map((_, index) => Game.createEmptyBox(index));
  }
  static isWinningPosition(position: Player[]): boolean {
    for (let i = 1; i < position.length; i++) {
      if (position[i - 1] !== position[i]) return false;
    }
    return true;
  }

  static winnerPositions = [
    // row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // column
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
}

export default Game;
