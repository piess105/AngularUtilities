import { Injectable, Renderer2 } from "@angular/core";
import { MovableElement } from "../models/MovableElement";
import { MovableElementObservable } from "../observables/MovableElementObservable";

@Injectable()
export class MovableElementFactory {
    constructor(private renderer: Renderer2, private observer: MovableElementObservable) {

    }
    create(element: Element): MovableElement {

        var res = new MovableElement(this.observer, this.renderer, element);

        res.subscribe(this.observer);

        return res;

    }
}