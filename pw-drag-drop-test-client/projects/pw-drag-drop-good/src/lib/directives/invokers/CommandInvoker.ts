import { Inject, Injectable, Injector, Type } from "@angular/core";
import { ICommand } from "../commands/ICommand";
import { MoveElementCommand } from "../commands/MoveElementCommand";
import { MouseElementListener } from "../listeners/MouseElementListener";
import { MovableElementCaching } from "../observables/MovableElementCaching";
import { IObservable, IObserver } from "../observables/IObservable";

@Injectable()
export class CommandInvoker implements IObserver {

    constructor(observable: MovableElementCaching, private command: MoveElementCommand) {
        observable.subscribe(this);
    }

    notified(obj: any): void {

        this.command.execute(obj);
    }

}

export class CommandInvoker2<TObservable extends IObservable, TCommand extends ICommand> implements IObserver {

    constructor(private observable: TObservable, private command: TCommand) {

        observable.subscribe(this);
    }

    notified(obj: any): void {

        this.command.execute(obj);
    }
}

@Injectable()
export class CommandInvokerRegister {

    constructor(private injector: Injector) {

    }

    register<TObservable extends IObservable, TCommand extends ICommand>(observable: Type<TObservable>, command : Type<TCommand>) {

        var obs = this.injector.get<TObservable>(observable);
        var c = this.injector.get<TCommand>(command);

        var r = new CommandInvoker2<TObservable, TCommand>(obs, c);

        return this;
    }
}