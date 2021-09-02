import { Inject, Injectable, Injector } from "@angular/core";
import { IObserver } from "../interfaces/IObserver";
import { ElementMoverObservable } from "../observables/ElementMoverObservable";
import { ObservableBase } from "../observables/ObservableBase";

export interface IElementStateInOut {
    handle(element: Element): void;
}

//Checks whether element goes in if goes then changes state to ElementStateIn
@Injectable()
export class ElementStateOut_NotifiesWhenInObservable extends ObservableBase implements IElementStateInOut {

    constructor(
        private injector: Injector,
        private handler: ElementStateInOutHandler) {
        super();
    }

    handle(element: Element): void {

        var rects = element.getBoundingClientRect();

        if (rects.x > 0 && rects.x + rects.width < window.innerWidth) {
            this.notify(element);

            this.handler.setState(this.injector.get(ElementStateIn_NotifiesWhenOutObservable));
        }
    }
}

//Check whether element goes out if goes then changes state to ElementStateOut
//Notifies when elements goes out

@Injectable()
export class ElementStateIn_NotifiesWhenOutObservable extends ObservableBase implements IElementStateInOut {

    constructor(
        private injector: Injector,
        private handler: ElementStateInOutHandler) {
        super();
    }

    handle(element: Element): void {

        var rects = element.getBoundingClientRect();

        if (rects.x < 0 || rects.x + rects.width > window.innerWidth) {
            this.notify(element);

            this.handler.setState(this.injector.get(ElementStateOut_NotifiesWhenInObservable));
        }
    }
}


@Injectable()
export class ElementStateInOutHandler implements IObserver {
    private state!: IElementStateInOut;

    constructor(
        private observable: ElementMoverObservable) {

        this.observable.subscribe(this);
    }

    notified(obj: Element): void {
        this.state.handle(obj);
    }

    setState(state: IElementStateInOut) {

        this.state = state;
    }

}