import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { MouseMovingCache } from './caches/MouseMovingCache';
import { MovableElementCache } from './caches/MovableElementCache';
import { ChangeElementColorCommand } from './commands/ChangeElementColorCommand';
import { MoveElementCommand } from './commands/MoveElementCommand';
import { MovableElementFactory } from './factories/MovableElementFactory';
import { CommandInvoker, CommandInvokerRegister } from './invokers/CommandInvoker';
import { MouseElementListener } from './listeners/MouseElementListener';
import { MouseListener } from './listeners/MouseListener';
import { MovableElementCaching } from './observables/MovableElementCaching';
import { MovableElementObservable } from './observables/MovableElementObservable';
import { MovableElementOutOfScreenOnXObservable } from './observables/MovableElementOutOfScreenOnXObservable';

@Directive({
  selector: '[pw-drag-drop]',
  providers: [CommandInvoker, MovableElementCache, MouseListener, MovableElementCaching, MoveElementCommand, MovableElementFactory, MouseElementListener, MovableElementObservable, MouseMovingCache, MovableElementOutOfScreenOnXObservable, CommandInvokerRegister, ChangeElementColorCommand]
})
export class PwDragDropDirective {
  /* 
   TASK:
  
  - Implement drag drop mechanism

   STEPS: 

  - Detect mouse click on the element
  - Move the element with cursor when mouse is click
  - Drop the element when mouse is released

   NEEDS:

  - Mouse click/unclick detection
  - Mouse movement coordinates
  - Returning the element when mouse is over (or clicked)
  - Changing element position


   EXTENSIONS:

  - change the element color to red if the element's edge's left or right goes out of the screen. Return its original color when element goes back. 
  - return the element into its original position(and stop draging in this turn) if the elements' edge's up or down goes out of the screen

   Steps:

  - Check whether the element is out of the screen on x  and change its color if not return its initial color
  - Check whether the element is out of the screen on y and set its position to original and realse from moving
   

   NEEDS:

  - Get min and max screen size both x and y
  - Get element bouding rects (width height x y)
  - Change element color
  - Change element position


   BUG FIX:

  - fix the bug when element turns red and the same time goes out of screen on Y and does not change the color to initial color.

  */


  constructor(private mouseListener: MouseListener, private commandInvokerRegister: CommandInvokerRegister) {
  }

  ngAfterViewInit() {

    this.commandInvokerRegister
    .register(MovableElementCaching, MoveElementCommand)
    .register(MovableElementOutOfScreenOnXObservable,ChangeElementColorCommand)
    ;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {

    this.mouseListener.mouseDown.next(event);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {

    this.mouseListener.mouseUp.next(event);

  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    this.mouseListener.mouseMove.next(event);
  }

}
