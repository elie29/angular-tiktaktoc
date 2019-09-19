import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { defaultState, LINES, Square, State } from './utils';

@Injectable({
  providedIn: 'root'
})
export class Board {
  private actionState = new BehaviorSubject<State>(defaultState);

  state$ = this.actionState.asObservable();

  private get value() {
    return this.actionState.value;
  }

  private next(state: State) {
    this.actionState.next(state);
  }

  move(step: number): void {
    const value = this.value;
    const history = value.history.slice(0, value.stepIndex + 1);
    const squares = [...history[value.stepIndex]];

    if (squares[step] || this.calculateWinner(squares)) {
      return;
    }

    squares[step] = value.xIsNext ? 'X' : 'O';

    this.next({
      history: [...history, squares],
      stepIndex: history.length,
      xIsNext: !value.xIsNext
    });
  }

  jumpTo(step: number): void {
    this.next({
      ...this.value,
      stepIndex: step,
      xIsNext: step % 2 ? false : true
    });
  }

  calculateWinner(squares: Square[]): Square {
    for (let i = 0; i < LINES.length; i += 1) {
      const [a, b, c] = LINES[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  getStatus(squares: Square[]): string {
    const winner = this.calculateWinner(squares);

    if (winner) {
      return 'Winner: ' + winner;
    }

    if (this.value.stepIndex === 9) {
      return 'No Winner';
    }

    return 'Next player: ' + (this.value.xIsNext ? 'X' : 'O');
  }
}
