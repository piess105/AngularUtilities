import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PwDragDropModule } from 'projects/pw-drag-drop-bad/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PwDragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
