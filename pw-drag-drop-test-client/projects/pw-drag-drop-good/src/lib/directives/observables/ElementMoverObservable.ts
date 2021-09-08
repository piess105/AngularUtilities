import { Injectable, Renderer2 } from "@angular/core";
import { PwDragDropDirectiveProvider } from "../pw-drag-drop.directive";
import { ObservableBase, ObservableBaseGeneric } from "./ObservableBase";

export class ElementWithReference {
    element!: Element;
    reference: any;
}

@Injectable()
export class ElementMoverObservable extends ObservableBase {
    constructor(
        private provider: PwDragDropDirectiveProvider,
        private renderer: Renderer2) {
        super();
    }

    move(element: Element, x: number, y: number) {

        this.renderer.setStyle(element, "transform", `translate(${x}px, ${y}px)`);

        this.notify({ element: element, reference: this.provider.getReference() });
    }
}