import { ElementRef, Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { MouseMovingCache } from "../caches/MouseMovingCache";
import { MouseListener } from "./MouseListener";

export class PointModel {
    x!: number;
    y!: number;
}

export class MouseElementListenerModel {
    element!: Element;
    startingPoint!: PointModel;
    currentPoint!: PointModel;
}

export interface IMouseElementListener {
    mouseMove: ReplaySubject<MouseElementListenerModel>;
}

@Injectable()
export class MouseElementListener implements IMouseElementListener{

    mouseMove: ReplaySubject<MouseElementListenerModel> = new ReplaySubject();

    private startingPoint?: PointModel;

    constructor(
        private cache : MouseMovingCache,
        private element: ElementRef,
        mouseListener: MouseListener) {

        mouseListener.mouseDown.subscribe(event => this.onMouseDown(event));
        mouseListener.mouseUp.subscribe(event => this.onMouseUp(event));
        mouseListener.mouseMove.subscribe(event => this.onMouseMove(event));
    }

    private onMouseDown(event: MouseEvent): void {

        this.startingPoint = this.createPoint(event.clientX, event.clientY);
    }

    private onMouseUp(event: MouseEvent): void {
        this.startingPoint = undefined;
        this.cache.clear();
    }

    private onMouseMove(event: MouseEvent): void {
        if (this.startingPoint == undefined)
            return;

        var res = this.createModel(event);

        this.cache.set(res);
        this.mouseMove.next(res);
    }

    private createModel(event: MouseEvent) : MouseElementListenerModel{

        var res = new MouseElementListenerModel();
        res.element = this.element.nativeElement;
        res.currentPoint = this.createPoint(event.clientX, event.clientY);
        res.startingPoint = this.startingPoint!;

        return res;
    }

    private createPoint(x: number, y: number): PointModel {

        var res = new PointModel();
        res.x = x;
        res.y = y;

        return res;
    }

}