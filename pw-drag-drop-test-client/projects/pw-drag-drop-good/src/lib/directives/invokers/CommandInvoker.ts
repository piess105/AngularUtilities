import { Inject, Injectable, Injector, Type } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";
import { MoveElementCommand } from "../commands/MoveElementCommand";
import { IObservable, IObserver } from "../interfaces/IObserver";

export class CommandInvoker<TObservable extends IObservable, TCommand extends ICommand> implements IObserver {

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

        var r = new CommandInvoker<TObservable, TCommand>(obs, c);

        return this;
    }
}