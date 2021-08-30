import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PwLibModule } from 'projects/pw-lib/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PwLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
