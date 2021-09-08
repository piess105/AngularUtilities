import { ElementRef } from "@angular/core";
import { IDisposable } from "./IDisposable";

export interface IObservable {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
}

export interface IObserver {

    notified(obj: any): void;
}

export interface IObserverElementDisposable extends IObserver, IDisposable{
    
    element : ElementRef;
}