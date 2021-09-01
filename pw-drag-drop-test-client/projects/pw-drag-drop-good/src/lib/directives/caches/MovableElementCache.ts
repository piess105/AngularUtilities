import { Injectable } from "@angular/core";
import { MovableElement } from "../models/MovableElement";


@Injectable()
export class MovableElementCache {
    private elements: MovableElement[] = [];

    get(): MovableElement[] {
        return this.elements;
    }

    add(element: MovableElement) {

        this.elements.push(element);
    }

    clear() {
        this.elements.length = 0;
    }
}