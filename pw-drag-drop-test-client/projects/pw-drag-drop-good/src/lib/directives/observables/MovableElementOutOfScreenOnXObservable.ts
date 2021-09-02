import { Injectable } from "@angular/core";
import { MovableElement } from "../models/MovableElement";
import { IObserver, ObservableBase } from "./IObservable";
import { MovableElementObservable } from "./MovableElementObservable";

@Injectable()
export class MovableElementOutOfScreenOnXObservable extends ObservableBase implements IObserver {
    constructor(observable: MovableElementObservable) {
        super();

        observable.subscribe(this);
    }
    private moved = false;
    notified(obj: MovableElement): void {

        


        if(this.moved == false){
            this.moved = true;
            this.notify(obj);

        }
    }
}