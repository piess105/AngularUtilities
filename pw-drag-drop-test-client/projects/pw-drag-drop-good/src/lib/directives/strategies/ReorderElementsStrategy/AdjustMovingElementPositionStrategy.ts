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

        if (this.isMovingElementOutOfItsParent_Or_haventChangedThePosition(model.element)) {

            this.restoreMovingElementOriginalPosition(model.element);
        }
        else {
            this.setMovingElementPositionBasedOnItCurrentPosition(model.element);
        }
    }

    private isMovingElementOutOfItsParent_Or_haventChangedThePosition = (movingElement: Element): boolean => {

        var newIndex = this.getMovingElementNewIndexValue(movingElement);
        var originalIndex =  this.getElementIndex(movingElement);
        
        if (newIndex == undefined || newIndex == originalIndex)
            return true;

        return false;
    }

    private restoreMovingElementOriginalPosition = (movingElement: Element) => {
        console.log("RESTORING");

    }

    private setMovingElementPositionBasedOnItCurrentPosition = (movingElement: Element) => {
        console.log("Seting new");


    }

}