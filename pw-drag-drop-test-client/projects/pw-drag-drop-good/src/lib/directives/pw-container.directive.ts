import { Directive, ElementRef, EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { CallOnce } from './common/helpers/CallOnce';
import { DirectiveType } from './enums/DirectiveType';
import { IObserver } from './interfaces/IObserver';
import { CommandInvokerRegister } from './invokers/CommandInvoker';
import { MouseListener, MouseListenerBetter } from './listeners/MouseListener';
import { MousePosition } from './models/MousePosition';
import { ElementMoverObservable, ElementWithReference } from './observables/ElementMoverObservable';
import { GlobalElementMovementObservable } from './observables/GlobalElementMoverObservable';
import { ContainerInState, ContainerOutState, ContainerStateHandler } from './states/ContainerInState';
import { DirectiveStateRegister } from './states/DirectiveStateChanger';
import { ReorderElementsOnMovingDownStrategy } from './strategies/ReorderElementsStrategy/ReorderElementsOnMovingDownStrategy';
import { ReorderElementsOnMovingUpStrategy } from './strategies/ReorderElementsStrategy/ReorderElementsOnMovingUpStrategy';
import { ReorderElementsStrategy } from './strategies/ReorderElementsStrategy/ReorderElementsStrategy';
import { ResetElementsOnMovingStrategy } from './strategies/ReorderElementsStrategy/ResetElementsOnMovingStrategy';
import { TryConsumeSuppliedElementStrategy } from './strategies/TryConsumeElementStrategy';


@Injectable()
export class PwContainerDirectiveOutputCaller {

  private _addElementCalled?: (item: any) => void;

  setAddElementCalled(emitter: EventEmitter<any>) {

    if (this._addElementCalled != undefined)
      return;

    this._addElementCalled = (item) => emitter.emit(item);
  }

  callAddElementCalled(item: any) {

    if (this._addElementCalled == undefined)
      throw new Error("_addElementCalled has not been set use: setAddElementCalled method to set");

    this._addElementCalled(item);
  }
}

@Directive({
  selector: '[pw-container]',
  providers: [CommandInvokerRegister, ContainerStateHandler, ContainerOutState, ContainerInState, TryConsumeSuppliedElementStrategy, PwContainerDirectiveOutputCaller, ReorderElementsStrategy, ReorderElementsOnMovingUpStrategy, ReorderElementsOnMovingDownStrategy, ResetElementsOnMovingStrategy]
})
export class PwContainerDirective implements IObserver {

  @Output() addElementCalled: EventEmitter<any> = new EventEmitter();

  constructor(
    private outputCaller : PwContainerDirectiveOutputCaller,
    private strategy: ReorderElementsStrategy,
    globalElementMovement: GlobalElementMovementObservable

  ) {
    globalElementMovement.subscribe(this);

    this.outputCaller.setAddElementCalled(this.addElementCalled);
  }


  notified(element: ElementWithReference): void {
    this.strategy.execute(element);
  }

  ngAfterViewInit() {

  }
}

