import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";

@Injectable()
export class AdjustMovingElementPositionStrategy extends ReorderElementsOnMovingStrategyBase {

    constructor(
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    execute(model: ElementWithReference, movingElementStartingPosition: number): void {

        if (this.isMovingElementOutOfItsParent_Or_haventSwappedWithOtherElement(model.element)) {

            this.restoreMovingElementOriginalPosition(model.element);
        }
        else {
            this.setMovingElementPositionBasedOnItCurrentPosition(model.element);
        }
    }

    private isMovingElementOutOfItsParent_Or_haventSwappedWithOtherElement = (movingElement: Element): boolean => {

        var newIndex = this.getMovingElementNewIndexValue(movingElement);
        var originalIndex = this.getElementIndex(movingElement);

        if (newIndex == undefined || newIndex == originalIndex)
            return true;

        return false;
    }

    private restoreMovingElementOriginalPosition = (movingElement: Element) => {
        this.renderer.removeStyle(movingElement, "transform");
    }

    private setMovingElementPositionBasedOnItCurrentPosition = (movingElement: Element) => {

        var index = this.getMovingElement_NewIndex_CurrentIndex_Difference(movingElement);

        var transform = this.getElement_Y_TransformByItsIndex(movingElement, index);

        this.renderer.setStyle(movingElement, "transform", `translateY(${transform}px)`);
    }

    private getMovingElement_NewIndex_CurrentIndex_Difference = (movingElement: Element) => {


        var newIndex = this.getMovingElementNewIndexValue(movingElement);
        var originalIndex = this.getElementIndex(movingElement);

        var difference = newIndex! - originalIndex;

        return difference;
    }

    private getElement_Y_TransformByItsIndex = (element: Element, index: number): number => {

        var margin = parseInt(getComputedStyle(element).marginTop);

        var transform = (element.getBoundingClientRect().height + margin) * index;

        return transform
    }

}