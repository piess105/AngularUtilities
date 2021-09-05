import { Renderer2, ElementRef } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";

export abstract class ReorderElementsOnMovingStrategyBase {

    protected NEW_INDEX_ATTRIBUTE_NAME = "new_index";

    constructor(
        protected renderer: Renderer2,
        protected element: ElementRef
    ) {

    }

    abstract execute(model: ElementWithReference, movingElementStartingPosition: number): void;

    protected getMovingElementNewIndexValue = (movingElement: Element) => {

        return parseInt(movingElement.getAttribute(this.NEW_INDEX_ATTRIBUTE_NAME)!);
    }

    protected setMovingElementNewIndexAttrbute = (movingElement: Element, predicate: (prevValue: number) => number) => {

        if (!movingElement.hasAttribute(this.NEW_INDEX_ATTRIBUTE_NAME)) {
            this.renderer.setAttribute(movingElement, this.NEW_INDEX_ATTRIBUTE_NAME, this.getElementIndex(movingElement).toString());
        }

        var prevValue = parseInt(movingElement.getAttribute(this.NEW_INDEX_ATTRIBUTE_NAME)!);

        prevValue = predicate(prevValue);

        this.renderer.setAttribute(movingElement, this.NEW_INDEX_ATTRIBUTE_NAME, prevValue.toString());
    }

    protected getElementIndex = (element: Element): number => {

        var children = this.getAllChildren();

        for (var i = 0; i < children.length; i++) {
            if (element == children[i])
                return i;
        }

        return -1;
    }

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