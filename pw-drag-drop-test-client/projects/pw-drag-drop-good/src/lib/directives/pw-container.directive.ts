import { Directive, ElementRef } from '@angular/core';
import { IObserver } from './interfaces/IObserver';
import { ElementMoverObservable } from './observables/ElementMoverObservable';
import { GlobalElementMovementObservable } from './observables/GlobalElementMoverObservable';

@Directive({
  selector: '[pw-container]',
})
export class PwContainerDirective implements IObserver {

  constructor(
    private element: ElementRef,
    private observable: GlobalElementMovementObservable) {

    observable.subscribe(this);
  }


  notified(element: Element): void {

    console.log("HELLO");
  }

  private collides(x : number, y : number, collider : Element): boolean {

    var coliderRect = collider.getBoundingClientRect();


    

    return false;
  }

}
