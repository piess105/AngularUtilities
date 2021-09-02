import { Injectable } from "@angular/core";
import { IObserver } from "../interfaces/IObserver";
import { ObservableBase } from "./ObservableBase";

@Injectable()
export class MovableElementOutOfScreenOnXObservable extends ObservableBase implements IObserver {
 
    notified(obj: any): void {

        var rects = obj.element.getBoundingClientRect();

        if (rects.x < 0 || rects.x + rects.width > window.innerWidth) {
            this.notify(obj);
        }
    }
}