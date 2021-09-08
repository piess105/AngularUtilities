import { IObservable, IObserver } from "../interfaces/IObserver";

export abstract class ObservableBaseGeneric<T extends IObserver> implements IObservable {

    protected observers: T[] = [];

    subscribe(observer: T): void {
        this.observers.push(observer);
    }
    unsubscribe(observer: T): void {

        var index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }

    protected notify(obj: any) {

        this.observers.forEach(observer => {
            observer.notified(obj);
        });
    }
}

export abstract class ObservableBase extends ObservableBaseGeneric<IObserver> {


}




export class ObserverAction implements IObserver {
    constructor(private predicate: (item: any) => void) {

    }

    notified(obj: any): void {
        this.predicate(obj);
    }

}