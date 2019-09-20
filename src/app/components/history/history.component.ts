import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MovesList } from 'src/app/services/utils';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {
  @Input() data: MovesList;
  @Output() clicked = new EventEmitter<number>();

  getMoveDescription(move: number): string {
    return move ? `Move #${move}` : 'Game start';
  }

  onClick(move: number): false {
    this.clicked.emit(move);
    return false;
  }
}
