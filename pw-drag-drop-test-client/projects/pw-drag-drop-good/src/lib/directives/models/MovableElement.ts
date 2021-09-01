import { Renderer2 } from "@angular/core";
import { IDisposable } from "../interfaces/IDisposable";
import { IObservable, IObserver, ObservableBase } from "../observables/IObservable";

export class MovableElement extends ObservableBase implements IDisposable {

    constructor(
        private observer : IObserver,
        private renderer: Renderer2,
        private element: Element) {
        super();
    }
   

    move(x: number, y: number) {

        this.renderer.setStyle(this.element, "transform", `translate(${x}px, ${y}px)`);

        this.notify(this);
    }


    dispose(): void {
        this.unsubscribe(this.observer);
    }
}