import { Component } from '@angular/core';

import { Board } from '../services/board';
import { MovesList, Square, State } from '../services/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  state$ = this.board.state$;

  constructor(protected board: Board) {}

  move(cell: number): void {
    this.board.move(cell);
  }

  jumpTo(move: number): void {
    this.board.jumpTo(move);
  }

  getSquares(state: State): Square[] {
    return state.history[state.stepIndex];
  }

  getData(state: State): MovesList {
    return {
      moves: [...state.history.keys()],
      status: this.board.getStatus(this.getSquares(state))
    };
  }
}
