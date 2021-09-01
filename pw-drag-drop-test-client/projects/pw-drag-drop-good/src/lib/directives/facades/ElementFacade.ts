import { Renderer2 } from "@angular/core";

export interface IElementFacade {

    move(x: number, y: number): void;
}

export class ElementFacade implements IElementFacade {

    constructor(
        private renderer: Renderer2,
        private element: Element) {

    }

    move(x: number, y: number): void {

        this.renderer.setStyle(this.element, "transform", `translate(${x}px, ${y}px`);
    }

}