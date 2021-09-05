import { Renderer2, ElementRef } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";

export abstract class ReorderElementsOnMovingStrategyBase {

    constructor(
        protected renderer: Renderer2,
        protected element: ElementRef
    ) {
        
    }

    abstract execute(model: ElementWithReference, movingElementStartingPosition: number) : void;

    protected getElementTransformY = (element: Element) => {

        var transform = new WebKitCSSMatrix(getComputedStyle(element).transform).f;
        return transform;
    }

    protected getElementsCenters = (elements: Element[]): number[] => {

        var centers: number[] = [];

        elements.forEach(element => {
            centers.push(this.getElementCenter(element));
        });

        return centers;
    }

    protected getElementCenter = (element: Element): number => {

        var center = element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2;

        return center;

    }

    protected getAllChildren = (): Element[] => {

        var res: Element[] = [];

        var children = this.element.nativeElement.children;

        for (var i = 0; i < children.length; i++)
            res.push(children[i]);

        return res;
    }
}