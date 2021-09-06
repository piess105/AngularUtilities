import { Renderer2, ElementRef } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";

export abstract class ReorderElementsOnMovingStrategyBase {

    public static NEW_INDEX_ATTRIBUTE_NAME = "new_index";

    constructor(
        protected renderer: Renderer2,
        protected element: ElementRef
    ) {

    }

    abstract execute(model: ElementWithReference, movingElementStartingPosition: number): void;

    protected getMovingElementNewIndexValue = (movingElement: Element): number | undefined => {

        if (movingElement.getAttribute(ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME) == null)
            return undefined;

        return parseInt(movingElement.getAttribute(ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME)!);
    }

    protected setMovingElementNewIndexAttrbute_or_RemoveIfIsTheSameAsOriginal = (movingElement: Element, predicate: (prevValue: number) => number) => {

        if (!movingElement.hasAttribute(ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME)) {
            this.renderer.setAttribute(movingElement, ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME, this.getElementIndex(movingElement).toString());
        }

        var prevValue = parseInt(movingElement.getAttribute(ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME)!);

        prevValue = predicate(prevValue);
        var originalIndex = this.getElementIndex(movingElement);

        if(prevValue == originalIndex){
            this.removeMovingElementNewIndexAttribute(movingElement);
            return;
        }

        this.renderer.setAttribute(movingElement, ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME, prevValue.toString());
    }


    

    protected removeMovingElementNewIndexAttribute = (movingElement: Element) => {
        this.renderer.removeAttribute(movingElement, ReorderElementsOnMovingStrategyBase.NEW_INDEX_ATTRIBUTE_NAME);
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