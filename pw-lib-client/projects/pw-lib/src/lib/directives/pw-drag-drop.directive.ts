import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pw-drag-drop]'
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

  - change the element color to red if the element's edge's left or right goes out of the screen
  - return the element into its original position(and stop draging in this turn) if the elements' edge's up or down goes out of the screen
  */


  private isMouseDown = false;
  private prevX = 0;
  private prevY = 0;

  constructor(private element: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {

    this.isMouseDown = true;

    this.prevX = event.clientX;
    this.prevY = event.clientY;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {

    this.isMouseDown = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown)
      return;

     var x = event.clientX - this.prevX;
     var y = event.clientY - this.prevY;

    this.renderer.setStyle(this.element.nativeElement, "transform", `translate(${x}px, ${y}px)`);
  }

}
