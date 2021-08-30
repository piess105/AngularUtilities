import { NgModule } from '@angular/core';
import { PwLibComponent } from './pw-lib.component';
import { PwDragDropDirective } from './directives/pw-drag-drop.directive';



@NgModule({
  declarations: [
    PwLibComponent,
    PwDragDropDirective
  ],
  imports: [
  ],
  exports: [
    PwLibComponent,
    PwDragDropDirective
  ]
})
export class PwLibModule { }
