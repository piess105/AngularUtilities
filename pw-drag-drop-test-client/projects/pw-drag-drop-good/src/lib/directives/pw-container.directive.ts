import { Directive, ElementRef, EventEmitter, HostListener, Injectable, Output, Renderer2 } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { CallOnce, CallOnceWithBeforeNotification } from './common/helpers/CallOnce';
import { DirectiveType } from './enums/DirectiveType';
import { IObserver, IObserverElementDisposable } from './interfaces/IObserver';
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
import { TryConsumeSuppliedElementStrategy } from './strategies/TryConsumeSuppliedElementStrategy';
import { RemoveElementsRemindersStrategy } from './strategies/ReorderElementsStrategy/RemoveElementsRemindersStrategy';
import { EventEmitterSetterCaller } from './common/helpers/EventEmitterSetterCaller';
import { NotifiesOnlyOneContainerAtATimeDictributor } from './strategies/NotifiesOnlyOneContainerAtATimeDictributor';
import { ObservableBase, ObservableBaseGeneric } from './observables/ObservableBase';
import { ISomething } from './strategies/ISomething';
import { ReorderElementsStrategyFactory } from './factories/ReorderElementsStrategyFactory';
import { TryConsumeSuppliedElementStrategyFactory } from './factories/TryConsumeSuppliedElementStrategyFactory';
import { IDisposable } from './interfaces/IDisposable';


@Injectable()
export class PwContainerDirectiveOutputsCaller {

  public addElementCalled: EventEmitterSetterCaller<any> = new EventEmitterSetterCaller();
  public updateElementCalled: EventEmitterSetterCaller<any> = new EventEmitterSetterCaller();
}



@Directive({
  selector: '[pw-container]',
  providers: [CommandInvokerRegister, ContainerStateHandler, ContainerOutState, ContainerInState, TryConsumeSuppliedElementStrategy, PwContainerDirectiveOutputsCaller, ReorderElementsStrategy, ReorderElementsOnMovingUpStrategy, ReorderElementsOnMovingDownStrategy, TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy, TryNotifyClientStrategy, AdjustMovingElementPositionStrategy, RemoveElementsRemindersStrategy, ReorderElementsStrategyFactory, TryConsumeSuppliedElementStrategyFactory]
})
export class PwContainerDirective extends ObservableBase implements IObserverElementDisposable, IDisposable {

  @Output() addElementCalled: EventEmitter<any> = new EventEmitter();
  @Output() updateElementCalled: EventEmitter<any> = new EventEmitter();

  private callOnce: CallOnceWithBeforeNotification = new CallOnceWithBeforeNotification();
  private strategy?: ISomething = undefined;

  constructor(
    private renderer: Renderer2,
    private distributor: NotifiesOnlyOneContainerAtATimeDictributor,
    public element: ElementRef,
    private outputsCaller: PwContainerDirectiveOutputsCaller,
    private reodrerElementsStrategyFactory: ReorderElementsStrategyFactory,
    private tryConsumeStrategyFactory: TryConsumeSuppliedElementStrategyFactory,


  ) {
    super();

    this.distributor.subscribe(this);

    this.outputsCaller.addElementCalled.set(this.addElementCalled);
    this.outputsCaller.updateElementCalled.set(this.updateElementCalled);
  }




  notified(element: ElementWithReference): void {

    var isMovingElementBelongingToTHISContainer = this.isMovingElementBelongingToTHISContainer(element.element);

    this.assignStrategyIfItsUndefined(isMovingElementBelongingToTHISContainer);

    this.trySwitchStrategy_AND_disposePreviousOnSwitch(isMovingElementBelongingToTHISContainer);

    this.strategy?.execute(element);

  }

  dispose(): void {
    this.strategy?.dispose();
    this.strategy = undefined;
  }

  private trySwitchStrategy_AND_disposePreviousOnSwitch = (isMovingElementBelongingToTHISContainer: boolean) => {

    this.callOnce.Call(() => isMovingElementBelongingToTHISContainer,
      () => this.strategy = this.reodrerElementsStrategyFactory.create(),
      () => this.strategy = this.tryConsumeStrategyFactory.create(),
      () => this.strategy?.dispose());
  }

  private assignStrategyIfItsUndefined = (isMovingElementBelongingToTHISContainer: boolean) => {

    if (this.strategy != undefined)
      return;

    this.strategy = isMovingElementBelongingToTHISContainer ? this.reodrerElementsStrategyFactory.create() : this.tryConsumeStrategyFactory.create();
  };



  private isMovingElementBelongingToTHISContainer = (element: Element): boolean => {

    var parent = element.parentNode;

    return parent == this.element.nativeElement;
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.element.nativeElement, "border", "1px solid red");
  }
}

