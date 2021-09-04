import { Directive, ElementRef, HostListener, Injectable, Injector, Renderer2 } from '@angular/core';
import { ChangeElementColorCommand, ChangeElementColorToDefaultCommand } from './commands/ChangeElementColorCommand';
import { InvokeGlobalElementObservableCommand } from './commands/InvokeGlobalElementObservableCommand';
import { MoveElementCommand } from './commands/MoveElementCommand';
import { DirectiveType } from './enums/DirectiveType';
import { CommandInvokerRegisterFactory } from './factories/CommandInvokerRegisterFactory';
import { CommandInvokerRegister } from './invokers/CommandInvoker';
import { MouseListener } from './listeners/MouseListener';
import { ElementMoverObservable } from './observables/ElementMoverObservable';
import { MouseSlidingOnElementObservable } from './observables/MouseSlidingOnElementObservable';
import { DirectiveStateChanger, DirectiveStateRegister } from './states/DirectiveStateChanger';
import { ElementStateIn_NotifiesWhenOutObservable, ElementStateInOutHandler, ElementStateOut_NotifiesWhenInObservable } from './states/ElementStateOut';
import { StateChangerBase, StateRegisterBase } from './states/StateChangerBase';

@Directive({
  selector: '[pw-drag-drop]',
  providers: [MouseListener, MoveElementCommand, CommandInvokerRegister, ChangeElementColorCommand, ChangeElementColorToDefaultCommand, MouseSlidingOnElementObservable, ElementMoverObservable,
    ElementStateOut_NotifiesWhenInObservable, ElementStateIn_NotifiesWhenOutObservable, ElementStateInOutHandler, InvokeGlobalElementObservableCommand,
    CommandInvokerRegisterFactory]
})
export class PwDragDropDirective {

  constructor(
    private stateChanged: DirectiveStateChanger,
    private stateRegister: DirectiveStateRegister,
    private injector: Injector,
    private mouseListener: MouseListener,
    private commandInvokerRegister: CommandInvokerRegister, private handler: ElementStateInOutHandler) {
  }

  ngAfterViewInit() {

    this.commandInvokerRegister
      .register(MouseSlidingOnElementObservable, MoveElementCommand)
      .register(ElementStateIn_NotifiesWhenOutObservable, ChangeElementColorCommand)
      .register(ElementStateOut_NotifiesWhenInObservable, ChangeElementColorToDefaultCommand)
      .register(ElementMoverObservable, InvokeGlobalElementObservableCommand)

      this.commandInvokerRegister.resubscribe();


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

