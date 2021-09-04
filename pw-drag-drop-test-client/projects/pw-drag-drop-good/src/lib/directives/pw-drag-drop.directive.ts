import { Directive, ElementRef, HostListener, Injectable, Injector, Input, Renderer2 } from '@angular/core';
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
import { StateChangerBase, StateRegisterBase } from './states/StateChangerBase';

@Injectable()
export class PwDragDropDirectiveProvider {

  private _reference: any;

  setReference(reference: any) {

    this._reference = reference;
  }

  getReference(): any {

    if (this._reference == undefined)
      throw Error("Reference has not been set use: setReference to set");

    return this._reference;
  }

}

@Directive({
  selector: '[pw-drag-drop]',
  providers: [MouseListener, MoveElementCommand, CommandInvokerRegister, ChangeElementColorCommand, ChangeElementColorToDefaultCommand, MouseSlidingOnElementObservable, ElementMoverObservable,
    InvokeGlobalElementObservableCommand, PwDragDropDirectiveProvider,
    CommandInvokerRegisterFactory]
})
export class PwDragDropDirective {

  @Input() reference: any;

  constructor(
    private provider : PwDragDropDirectiveProvider,
    private stateChanged: DirectiveStateChanger,
    private stateRegister: DirectiveStateRegister,
    private injector: Injector,
    private mouseListener: MouseListener,
    private commandInvokerRegister: CommandInvokerRegister) {
  }

  ngAfterViewInit() {

    this.commandInvokerRegister
      .register(MouseSlidingOnElementObservable, MoveElementCommand)
      .register(ElementMoverObservable, InvokeGlobalElementObservableCommand)

    this.commandInvokerRegister.resubscribe();


    this.provider.setReference(this.reference);
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

