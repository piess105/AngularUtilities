import { Injectable } from "@angular/core";
import { IObserver } from "../interfaces/IObserver";
import { ObservableBase, ObservableBaseGeneric } from "./ObservableBase";

@Injectable({ providedIn: 'root' })
export class GlobalElementMovementObservable extends ObservableBase implements IObserver {

    notified(obj: any): void {
       this.notify(obj);
    }

}