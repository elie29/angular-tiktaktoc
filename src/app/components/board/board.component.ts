import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Square } from 'src/app/services/utils';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  @Input() squares: Square[];
  @Output() clicked = new EventEmitter<number>();

  onClick(step: number): void {
    this.clicked.emit(step);
  }
}
