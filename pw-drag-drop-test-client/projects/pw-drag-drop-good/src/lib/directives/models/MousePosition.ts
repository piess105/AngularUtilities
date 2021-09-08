import { Injectable } from "@angular/core";
import { fromEvent } from "rxjs";

@Injectable({ 'providedIn': 'root' })
export class MousePosition {

    private _x: number = 0;
    private _y: number = 0;
    private _event!: MouseEvent;

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get event(): MouseEvent {

        return this._event;
    }

    constructor() {

        fromEvent(window, 'mousemove').subscribe(e => {

            this._x = (e as MouseEvent).clientX;
            this._y = (e as MouseEvent).clientY;

            this._event = e as MouseEvent;
        });
    }
}