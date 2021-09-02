import { NgModule } from '@angular/core';
import { PwDragDropDirective } from './directives/pw-drag-drop.directive';
import { PwContainerDirective } from './directives/pw-container.directive';




@NgModule({
  declarations: [
    PwDragDropDirective,
    PwContainerDirective
  ],
  imports: [
  ],
  exports: [
    PwDragDropDirective,
    PwContainerDirective
  ]
})
export class PwDragDropModule { }
