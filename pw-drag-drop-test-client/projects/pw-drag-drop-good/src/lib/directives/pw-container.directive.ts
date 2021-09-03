import { Directive, ElementRef } from '@angular/core';
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
export class PwContainerDirective {

  constructor(
    private stateRegister: DirectiveStateRegister,
    private commandInvokerRegister: CommandInvokerRegister,
    private handler: ContainerStateHandler,
  ) {

  }

  ngAfterViewInit() {

    this.stateRegister.register(DirectiveType.Container,
      () => { console.log("ContainerWake") },
      () => { console.log("Sleep") });

    this.handler.setState(ContainerOutState);

  }


}
