import { Renderer2, ElementRef, Injectable } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";

@Injectable()
export class ReorderElementsOnMovingDownStrategy extends ReorderElementsOnMovingStrategyBase {

    constructor(
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    override execute(model: ElementWithReference, movingElementStartingPosition: number) {

        var elements = this.getElementsAboveMovingOne(model.element, movingElementStartingPosition);

        elements = this.excludeElementsToPreventDoubleMove(elements, model.element);

        this.moveElementsUp(elements);

        this.increaseNewMovingElementIndexAttribute(model.element, elements);
    }

    protected increaseNewMovingElementIndexAttribute = (movingElement: Element, elements: Element[]) => {

        this.setMovingElementNewIndexAttrbute(movingElement, (prevValue) => prevValue + elements.length);
    };

    private excludeElementsToPreventDoubleMove = (elements: Element[], movingElement: Element): Element[] => {

        var movingElementOriginalCenterPosition = this.getElementCenter(movingElement) - this.getElementTransformY(movingElement);

        var res: Element[] = [];

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (this.getElementTransformY(element) == 0 && this.getElementCenter(element) < movingElementOriginalCenterPosition) {
                continue;
            }

            res.push(element);
        }

        return res;
    }

    private moveElementsUp = (elements: Element[]) => {

        elements.forEach(element => {
            var margin = parseInt(getComputedStyle(element).marginTop);
            var move = (element.getBoundingClientRect().height + margin) * -1;
            var value = this.getElementTransformY(element) == 0 ? move : 0;

            this.renderer.setStyle(element, "transform", `translateY(${value}px)`);
        });
    }

    private getElementsAboveMovingOne = (movingElement: Element, movingElementStartingPosition: number) => {

        var children = this.getAllChildren();
        var childrenCenters = this.getElementsCenters(children);
        var movingElementCenter = this.getElementCenter(movingElement);

        var res: Element[] = [];

        for (var i = 0; i < childrenCenters.length; i++) {

            var child = children[i];
            var childCenter = childrenCenters[i];

            if (this.getElementTransformY(child) < 0)
                continue;

            if (childCenter < movingElementCenter && childCenter > movingElementStartingPosition)
                res.push(child);

        }

        return res;
    };

}