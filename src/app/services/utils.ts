export type Square = 'O' | 'X' | null;

export interface State {
  history: Square[][];
  stepIndex: number;
  xIsNext: boolean;
}

export interface MovesList {
  moves: Array<number>;
  status: string;
}

export const defaultState: State = {
  history: [Array(9).fill(null)],
  stepIndex: 0,
  xIsNext: true
};

export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
