export interface IObservable {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
}

export interface IObserver {

    notified(obj: any): void;
}