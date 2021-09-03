import { Directive, ElementRef, HostListener, Injectable, Injector, Renderer2 } from '@angular/core';
import { ChangeElementColorCommand, ChangeElementColorToDefaultCommand } from './commands/ChangeElementColorCommand';
import { InvokeGlobalElementObservableCommand } from './commands/InvokeGlobalElementObservableCommand';
import { MoveElementCommand } from './commands/MoveElementCommand';
import { CommandInvokerRegisterFactory } from './factories/CommandInvokerRegisterFactory';
import { CommandInvokerRegister } from './invokers/CommandInvoker';
import { MouseListener } from './listeners/MouseListener';
import { ElementMoverObservable } from './observables/ElementMoverObservable';
import { MouseSlidingOnElementObservable } from './observables/MouseSlidingOnElementObservable';
import { ElementStateIn_NotifiesWhenOutObservable, ElementStateInOutHandler, ElementStateOut_NotifiesWhenInObservable } from './states/ElementStateOut';
import { StateChanger, StateRegister } from './states/StateChanger';

@Directive({
  selector: '[pw-drag-drop]',
  providers: [MouseListener, MoveElementCommand, CommandInvokerRegister, ChangeElementColorCommand, ChangeElementColorToDefaultCommand, MouseSlidingOnElementObservable, ElementMoverObservable,
    ElementStateOut_NotifiesWhenInObservable, ElementStateIn_NotifiesWhenOutObservable, ElementStateInOutHandler, InvokeGlobalElementObservableCommand,
    CommandInvokerRegisterFactory]
})
export class PwDragDropDirective {

  constructor(
    private stateChanged : StateChanger,
    private stateRegister: StateRegister,
    private injector: Injector,
    private mouseListener: MouseListener, private commandInvokerRegister: CommandInvokerRegister, private handler: ElementStateInOutHandler) {
  }

  ngAfterViewInit() {

    this.commandInvokerRegister
      .register(MouseSlidingOnElementObservable, MoveElementCommand)
      .register(ElementStateIn_NotifiesWhenOutObservable, ChangeElementColorCommand)
      .register(ElementStateOut_NotifiesWhenInObservable, ChangeElementColorToDefaultCommand)
      .register(ElementMoverObservable, InvokeGlobalElementObservableCommand)

    this.commandInvokerRegister.unsubscribe();

    this.stateRegister.register(1, () => {
      this.commandInvokerRegister.resubscribe();
    }, () => {
      this.commandInvokerRegister.unsubscribe();

    });

    this.stateRegister.register(2, () => { }, () => { });

    this.stateChanged.change(1);

    setTimeout(() => {
      this.stateChanged.change(2);
    }, 1000);

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

