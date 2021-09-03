import { Injectable } from "@angular/core";
import { fromEvent } from "rxjs";

@Injectable({ 'providedIn': 'root' })
export class MousePosition {

    private _x : number = 0;
    private _y : number = 0;

    get x() : number{
        return this._x;
    }

    get y() : number{
        return this._y;
    }

    constructor(){
        
        fromEvent(window, 'mousemove').subscribe(e => {

            this._x = (e as MouseEvent).clientX;
            this._y = (e as MouseEvent).clientY;
        });
    }
}