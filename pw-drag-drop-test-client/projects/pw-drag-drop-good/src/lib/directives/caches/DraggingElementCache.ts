import { Injectable } from "@angular/core";


@Injectable()
export class DraggingElementCache {
    private _element?: Element;

    get(): Element | undefined {
        return this._element;
    }

    set(element: Element) {

        this._element = element;
    }

    clear() {
        this._element = undefined;
    }
}