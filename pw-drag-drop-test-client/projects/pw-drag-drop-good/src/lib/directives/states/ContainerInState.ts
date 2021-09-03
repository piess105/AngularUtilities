import { ElementRef, Injectable, Injector, Type } from "@angular/core";
import { DirectiveType } from "../enums/DirectiveType";
import { IObserver } from "../interfaces/IObserver";
import { MousePosition } from "../models/MousePosition";
import { GlobalElementMovementObservable } from "../observables/GlobalElementMoverObservable";
import { DirectiveStateChanger } from "./DirectiveStateChanger";

export interface IDirectiveState {
    handle(): void;
}

@Injectable()
export class ContainerInState implements IDirectiveState {

    constructor(
        private element: ElementRef,
        private mousePosition: MousePosition) {

    }

    handle(): void {

        if (!this.collides(this.mousePosition.x, this.mousePosition.y, this.element.nativeElement)) 
        {
            console.log("NO COLIDES ANYMOER");
        }

    }

    private collides(x: number, y: number, collider: Element): boolean {

        var rect = collider.getBoundingClientRect();

        if (x < rect.x) return false;
        if (x > rect.x + rect.width) return false;
        if (y < rect.y) return false;
        if (y > rect.y + rect.height) return false;


        return true;
    }
}

@Injectable()
export class ContainerOutState implements IDirectiveState {

    constructor(
        private stateChanger: DirectiveStateChanger,
        private handler: ContainerStateHandler,
        private element: ElementRef,
        private mousePosition: MousePosition) {

    }

    handle(): void {

        if (this.collides(this.mousePosition.x, this.mousePosition.y, this.element.nativeElement)) {
            console.log("InContainer");

            this.stateChanger.change(DirectiveType.Container);

            this.handler.setState(ContainerInState);
        }

    }

    private collides(x: number, y: number, collider: Element): boolean {

        var rect = collider.getBoundingClientRect();

        if (x < rect.x) return false;
        if (x > rect.x + rect.width) return false;
        if (y < rect.y) return false;
        if (y > rect.y + rect.height) return false;


        return true;
    }

}

@Injectable()
export class ContainerStateHandler implements IObserver {

    private state!: IDirectiveState;

    constructor(
        private injector: Injector,
        private observable: GlobalElementMovementObservable) {
        observable.subscribe(this);
    }

    notified(obj: any): void {

        this.state?.handle();
    }



    setState<TState extends IDirectiveState>(type: Type<TState>) {
        this.state = this.injector.get(type);
    }
}