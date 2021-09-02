import { IObservable, IObserver } from "../interfaces/IObserver";



export abstract class ObservableBase implements IObservable {

    private observers: IObserver[] = [];

    subscribe(observer: IObserver): void {
        this.observers.push(observer);
    }
    unsubscribe(observer: IObserver): void {

        var index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }

    protected notify(obj: any) {

        this.observers.forEach(observer => {
            observer.notified(obj);
        });
    }
}