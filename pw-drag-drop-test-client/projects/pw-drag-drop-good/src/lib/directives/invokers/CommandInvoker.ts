import { Inject, Injectable } from "@angular/core";
import { ICommand } from "../commands/ICommand";
import { MoveElementCommand } from "../commands/MoveElementCommand";
import { MouseElementListener } from "../listeners/MouseElementListener";
import { MovableElementCaching } from "../observables/MovableElementCaching";
import { IObserver } from "../observables/IObservable";

@Injectable()
export class CommandInvoker implements IObserver {

    constructor(observable : MovableElementCaching, private command : MoveElementCommand) 
    {
        observable.subscribe(this);
    }



    notified(obj: any): void {
        
        this.command.execute(obj);
    }

}