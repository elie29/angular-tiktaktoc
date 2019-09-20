import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Board } from '../services/board';
import { MovesList, Square } from '../services/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  squares: Square[];
  data: MovesList;
  state$ = this.board.state$.pipe(
    tap(({ history, stepIndex }) => (this.squares = history[stepIndex])),
    tap(({ history }) => this.setData(history))
  );

  constructor(private board: Board) {}

  move(cell: number): void {
    this.board.move(cell);
  }

  jumpTo(move: number): void {
    this.board.jumpTo(move);
  }

  private setData(history: Square[][]): void {
    this.data = {
      moves: [...history.keys()],
      status: this.board.getStatus(this.squares)
    };
  }
}
