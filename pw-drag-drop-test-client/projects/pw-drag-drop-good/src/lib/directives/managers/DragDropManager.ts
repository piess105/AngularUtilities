import { ElementRef, Injectable } from "@angular/core";
import { DraggingElementCache } from "../caches/DraggingElementCache";
import { DraggingElementFacadeFactory } from "../factories/DraggingElementFacadeFactory";
import { MouseListener } from "../listeners/MouseListener";


@Injectable()
export class DragDropManager {

    constructor(
        private factory: DraggingElementFacadeFactory,
        private element: ElementRef,
        private cache: DraggingElementCache,
        listener: MouseListener) {

        listener.mouseDown.subscribe(event => this.onMouseDown(event));
        listener.mouseUp.subscribe(event => this.onMouseUp(event));
        listener.mouseMove.subscribe(event => this.onMouseMove(event));
    }

    onMouseDown(event: MouseEvent): void {

        this.cache.set(this.element.nativeElement);
    }


    onMouseUp(event: MouseEvent): void {

        this.cache.clear();
    }


    onMouseMove(event: MouseEvent): void {
        var element = this.factory.create();

        if (element == undefined)
            return;

        element.move(1, 2);
    }
}