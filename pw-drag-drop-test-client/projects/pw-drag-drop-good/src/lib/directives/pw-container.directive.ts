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
import { AdjustMovingElementPositionStrategy } from './strategies/ReorderElementsStrategy/AdjustMovingElementPositionStrategy';
import { ReorderElementsOnMovingDownStrategy } from './strategies/ReorderElementsStrategy/ReorderElementsOnMovingDownStrategy';
import { ReorderElementsOnMovingUpStrategy } from './strategies/ReorderElementsStrategy/ReorderElementsOnMovingUpStrategy';
import { ReorderElementsStrategy } from './strategies/ReorderElementsStrategy/ReorderElementsStrategy';
import { TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy } from './strategies/ReorderElementsStrategy/TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy';
import { TryNotifyClientStrategy } from './strategies/ReorderElementsStrategy/TryNotifyClientStrategy';
import { TryConsumeSuppliedElementStrategy } from './strategies/TryConsumeElementStrategy';
import { RemoveElementsRemindersStrategy } from './strategies/ReorderElementsStrategy/RemoveElementsRemindersStrategy';
import { EventEmitterSetterCaller } from './common/helpers/EventEmitterSetterCaller';


@Injectable()
export class PwContainerDirectiveOutputsCaller {

  public addElementCalled: EventEmitterSetterCaller<any> = new EventEmitterSetterCaller();
  public updateElementCalled: EventEmitterSetterCaller<any> = new EventEmitterSetterCaller();
}



@Directive({
  selector: '[pw-container]',
  providers: [CommandInvokerRegister, ContainerStateHandler, ContainerOutState, ContainerInState, TryConsumeSuppliedElementStrategy, PwContainerDirectiveOutputsCaller, ReorderElementsStrategy, ReorderElementsOnMovingUpStrategy, ReorderElementsOnMovingDownStrategy, TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy, TryNotifyClientStrategy, AdjustMovingElementPositionStrategy, RemoveElementsRemindersStrategy]
})
export class PwContainerDirective implements IObserver {

  @Output() addElementCalled: EventEmitter<any> = new EventEmitter();
  @Output() updateElementCalled: EventEmitter<any> = new EventEmitter();

  constructor(
    private outputsCaller: PwContainerDirectiveOutputsCaller,
    private strategy: ReorderElementsStrategy,
    globalElementMovement: GlobalElementMovementObservable

  ) {
    globalElementMovement.subscribe(this);

    this.outputsCaller.addElementCalled.set(this.addElementCalled);
    this.outputsCaller.updateElementCalled.set(this.updateElementCalled);
  }


  notified(element: ElementWithReference): void {
    this.strategy.execute(element);
  }

  ngAfterViewInit() {

  }
}

