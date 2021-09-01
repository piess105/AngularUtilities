import { Injectable, Renderer2 } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { MovableElementCache } from "../caches/MovableElementCache";
import { MovableElementFactory } from "../factories/MovableElementFactory";
import { IMouseElementListener, MouseElementListener, MouseElementListenerModel } from "../listeners/MouseElementListener";
import { MouseListener } from "../listeners/MouseListener";
import { MovableElement } from "../models/MovableElement";
import { ObservableBase } from "./IObservable";

@Injectable()
export class MovableElementCaching extends ObservableBase {

    private element: MovableElement | undefined;

    constructor(
        private cache : MovableElementCache,
        private factory: MovableElementFactory,
        mouseListener: MouseListener,
        listener: MouseElementListener) {
        super();

        listener.mouseMove.subscribe(x => this.onMouseMove(x));
        mouseListener.mouseUp.subscribe(x => this.onMouseUp(x));
    }

    private onMouseUp(x: MouseEvent): void {

        this.element?.dispose();
        this.element = undefined;
        this.cache.clear();
    }


    private onMouseMove(x: MouseElementListenerModel): void {

        if (this.element == undefined) {
            this.element = this.factory.create(x.element!);
            this.cache.add(this.element);
        }

        this.notify(x);
    }
}