import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardComponent } from './components/board/board.component';
import { HistoryComponent } from './components/history/history.component';
import { AppComponent } from './containers/app.component';

@NgModule({
  declarations: [AppComponent, HistoryComponent, BoardComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
