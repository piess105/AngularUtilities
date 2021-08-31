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

    var rects = (this.element.nativeElement as HTMLElement).getBoundingClientRect();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;


    if (rects.x < 0 || rects.x + rects.width > windowWidth) {
      this.renderer.setStyle(this.element.nativeElement, "background-color", "red");
    }
    else {
      this.renderer.removeStyle(this.element.nativeElement, "background-color");
    }

    if (rects.y < 0 || rects.y + rects.height > windowHeight) {
      this.renderer.removeStyle(this.element.nativeElement, "transform");
      this.renderer.removeStyle(this.element.nativeElement, "background-color");
      this.isMouseDown = false;
    }
    else {
      this.renderer.setStyle(this.element.nativeElement, "transform", `translate(${x}px, ${y}px)`);
    }
  }

}
