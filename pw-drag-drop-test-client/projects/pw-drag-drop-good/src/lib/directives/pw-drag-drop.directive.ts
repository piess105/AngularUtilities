import { Directive, ElementRef, HostListener, Injector, Renderer2 } from '@angular/core';
import { ChangeElementColorCommand, ChangeElementColorToDefaultCommand } from './commands/ChangeElementColorCommand';
import { MoveElementCommand } from './commands/MoveElementCommand';
import { CommandInvokerRegister } from './invokers/CommandInvoker';
import { MouseListener } from './listeners/MouseListener';
import { ElementMoverObservable } from './observables/ElementMoverObservable';
import { MouseSlidingOnElementObservable } from './observables/MouseSlidingOnElementObservable';
import { ElementStateIn_NotifiesWhenOutObservable, ElementStateInOutHandler, ElementStateOut_NotifiesWhenInObservable } from './states/ElementStateOut';

@Directive({
  selector: '[pw-drag-drop]',
  providers: [ MouseListener, MoveElementCommand, CommandInvokerRegister, ChangeElementColorCommand, ChangeElementColorToDefaultCommand, MouseSlidingOnElementObservable, ElementMoverObservable,
    ElementStateOut_NotifiesWhenInObservable, ElementStateIn_NotifiesWhenOutObservable, ElementStateInOutHandler]
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


  constructor(
    private injector : Injector,
    private mouseListener: MouseListener, private commandInvokerRegister: CommandInvokerRegister, private handler : ElementStateInOutHandler) {
  }

  ngAfterViewInit() {

    this.commandInvokerRegister
    .register(MouseSlidingOnElementObservable, MoveElementCommand)
    .register(ElementStateIn_NotifiesWhenOutObservable,ChangeElementColorCommand)
    .register(ElementStateOut_NotifiesWhenInObservable,ChangeElementColorToDefaultCommand)
    


    this.handler.setState(this.injector.get(ElementStateIn_NotifiesWhenOutObservable));
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
