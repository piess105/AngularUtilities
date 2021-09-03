import { Inject, Injectable, Injector, Type } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";
import { MoveElementCommand } from "../commands/MoveElementCommand";
import { IObservable, IObserver } from "../interfaces/IObserver";

export class CommandInvoker<TObservable extends IObservable, TCommand extends ICommand> implements IObserver {

    constructor(private observable: TObservable, private command: TCommand) {

        
    }

    notified(obj: any): void {

        this.command.execute(obj);
    }
}



@Injectable()
export class CommandInvokerRegister {

    private map: Map<CommandInvoker<IObservable, ICommand>, IObservable> = new Map<CommandInvoker<IObservable, ICommand>, IObservable>();

    constructor(private injector: Injector) {

    }

    register<TObservable extends IObservable, TCommand extends ICommand>(observable: Type<TObservable>, command: Type<TCommand>) {

        var obs = this.injector.get<TObservable>(observable);
        var c = this.injector.get<TCommand>(command);

        var r = new CommandInvoker<TObservable, TCommand>(obs, c);

        this.map.set(r, obs);

        return this;
    }

    unsubscribe() {

        this.map.forEach((k, v) => {
            k.unsubscribe(v);
        });
    }

    resubscribe() {

        this.map.forEach((k, v) => {
            k.subscribe(v);
        });
    }

}