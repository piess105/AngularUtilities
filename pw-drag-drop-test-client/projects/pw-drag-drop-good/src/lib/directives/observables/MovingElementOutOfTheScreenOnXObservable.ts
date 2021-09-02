import { Injectable } from "@angular/core";
import { IObserver } from "../interfaces/IObserver";
import { ElementMoverObservable } from "./ElementMoverObservable";
import { ObservableBase } from "./ObservableBase";

@Injectable()
export class MovingElementOutOfTheScreenOnXObservable extends ObservableBase implements IObserver {

    constructor(private observable: ElementMoverObservable) {
        super();

        observable.subscribe(this);
    }

    notified(element: Element): void {

        var rects = element.getBoundingClientRect();

        if (rects.x < 0 || rects.x + rects.width > window.innerWidth) {
            this.notify(element);
        }
    }
}