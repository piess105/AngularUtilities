import { Directive, ElementRef, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { CallOnce } from './common/helpers/CallOnce';
import { DirectiveType } from './enums/DirectiveType';
import { IObserver } from './interfaces/IObserver';
import { CommandInvokerRegister } from './invokers/CommandInvoker';
import { MousePosition } from './models/MousePosition';
import { ElementMoverObservable } from './observables/ElementMoverObservable';
import { GlobalElementMovementObservable } from './observables/GlobalElementMoverObservable';
import { ContainerInState, ContainerOutState, ContainerStateHandler } from './states/ContainerInState';
import { DirectiveStateRegister } from './states/DirectiveStateChanger';

@Directive({
  selector: '[pw-container]',
  providers: [CommandInvokerRegister, ContainerStateHandler, ContainerOutState, ContainerInState]
})
export class PwContainerDirective implements IObserver {

  private callOnce: CallOnce = new CallOnce();

  constructor(
    private element: ElementRef,
    private mousePosition: MousePosition,
    globalElementMovement: GlobalElementMovementObservable

  ) {
    globalElementMovement.subscribe(this);
  }

  notified(element: Element): void {


    this.callOnce.IF(
      () => this.slidingElementColides(this.mousePosition.x, this.mousePosition.y, this.element.nativeElement),
      () => { console.log("TRUE") },
      () => { console.log("FALSE") });

    // if (this.slidingElementColides(this.mousePosition.x, this.mousePosition.y, this.element.nativeElement)) {
    //   console.log("COLIDES");
    // }
    // else {
    // }

  }

  private slidingElementColides(x: number, y: number, collider: Element): boolean {

    var rect = collider.getBoundingClientRect();

    if (x < rect.x) return false;
    if (x > rect.x + rect.width) return false;
    if (y < rect.y) return false;
    if (y > rect.y + rect.height) return false;


    return true;
  }

  ngAfterViewInit() {



  }
}