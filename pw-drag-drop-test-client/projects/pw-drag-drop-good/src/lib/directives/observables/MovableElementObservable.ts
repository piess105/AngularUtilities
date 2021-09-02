import { Injectable } from "@angular/core";
import { IObserver, ObservableBase } from "./IObservable";

@Injectable()
export class MovableElementObservable extends ObservableBase implements IObserver {

    notified(obj: any): void {
        
        this.notify(obj);
    }


}