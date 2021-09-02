import { Injectable } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";
import { GlobalElementMovementObservable } from "../observables/GlobalElementMoverObservable";

@Injectable()
export class InvokeGlobalElementObservableCommand implements ICommand {
    constructor(private observable: GlobalElementMovementObservable) {

    }

    execute(obj: any): void {
        this.observable.notified(obj);
    }

}