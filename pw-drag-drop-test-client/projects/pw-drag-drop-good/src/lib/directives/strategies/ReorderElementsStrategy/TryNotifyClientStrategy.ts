import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";


@Injectable()
export class TryNotifyClientStrategy extends ReorderElementsOnMovingStrategyBase {

    constructor(
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    execute(model: ElementWithReference): void {

        if (!this.canNotify(model.element))
            return;
        console.log("HI");
    }

    private canNotify = (movingElement: Element): boolean => {

        if (!this.hasMovingElementSwopWithOtherElemnent(movingElement))
            return false;

        if (!this.isMovingElementInsideParentElement(movingElement))
            return false;


        return true;
    }

    private hasMovingElementSwopWithOtherElemnent = (movingElement: Element): boolean => {

        var newIndex = this.getMovingElementNewIndexValue(movingElement);

        return newIndex != undefined;
    }

    private isMovingElementInsideParentElement = (movingElement: Element): boolean => {


        return true;
    }


}