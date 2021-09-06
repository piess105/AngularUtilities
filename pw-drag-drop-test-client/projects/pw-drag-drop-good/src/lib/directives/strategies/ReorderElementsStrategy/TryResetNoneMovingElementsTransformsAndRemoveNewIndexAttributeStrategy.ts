import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";

@Injectable()
export class TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy extends ReorderElementsOnMovingStrategyBase {

    constructor(
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    execute(model: ElementWithReference): void {
        
        if (!this.canElementsBeReset(model.element))
            return;

        this.resetElements(model.element);
    }

    private canElementsBeReset = (movingElement: Element): boolean => {

        var index = this.getMovingElementNewIndexValue(movingElement);
       
        if (index != undefined)
            return true;

        return false;
    }

    private resetElements = (movingElement: Element) => {

        this.removeChildElementsTransforms(movingElement);

        this.removeMovingElementNewIndexAttribute(movingElement);      
    }

    private removeChildElementsTransforms = (movingElement: Element) => {

        var children = this.getAllChildren().filter(x => x !== movingElement);

        children.forEach(child => {

            this.renderer.removeStyle(child, "transform");
        });
    }

}