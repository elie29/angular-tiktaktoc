import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Assertion } from './assertion';
import {
  defaultState,
  LINES,
  MAX_LINES,
  MAX_STEPS,
  player,
  Square,
  State
} from './utils';

@Injectable({
  providedIn: 'root'
})
export class Board {
  private actionState = new BehaviorSubject<State>(defaultState);

  state$ = this.actionState.asObservable();

  private get value() {
    return this.actionState.value;
  }

  move(step: number): void {
    Assertion.between(step, 0, MAX_STEPS);

    const value = this.value;
    const history = value.history.slice(0, value.stepIndex + 1);
    const squares = [...history[value.stepIndex]];

    if (squares[step] || this.calculateWinner(squares)) {
      return;
    }

    squares[step] = player(value.xIsNext);

    this.actionState.next({
      history: [...history, squares],
      stepIndex: history.length,
      xIsNext: !value.xIsNext
    });
  }

  jumpTo(step: number): void {
    Assertion.between(step, 0, MAX_STEPS);

    this.actionState.next({
      ...this.value,
      stepIndex: step,
      xIsNext: step % 2 === 0
    });
  }

  calculateWinner(squares: Square[]): Square {
    for (let i = 0; i < MAX_LINES; i += 1) {
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
      return `Winner: ${winner}`;
    }

    if (this.value.stepIndex === MAX_STEPS) {
      return 'No Winner';
    }

    return `Next player: ${player(this.value.xIsNext)}`;
  }
}
