import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { MouseListener } from "../listeners/MouseListener";
import { ElementPositionModel } from "../models/ElementPositionModel";
import { PointModel } from "../models/PointModel";
import { ObservableBase } from "./ObservableBase";


@Injectable()
export class MouseSlidingOnElementObservable extends ObservableBase {

    private isMouseDown = false;
    private startingPoint!: PointModel;

    constructor(
        private element: ElementRef,
        listener: MouseListener) {
        super();

        listener.mouseDown.subscribe(x => this.onMouseDown(x));
        listener.mouseUp.subscribe(x => this.onMouseUp(x));
        listener.mouseMove.subscribe(x => this.onMouseMove(x));
    }

    private onMouseDown(x: MouseEvent): void {

        this.startingPoint = PointModel.create(x.clientX, x.clientY);
        this.isMouseDown = true;
    }
    private onMouseUp(x: MouseEvent): void {

        this.isMouseDown = false;
    }
    private onMouseMove(x: MouseEvent): void {

        if (this.isMouseDown == false) {
            return;
        }

        this.notify(ElementPositionModel.create(this.element.nativeElement, x.clientX - this.startingPoint.x, x.clientY - this.startingPoint.y))
    }


}