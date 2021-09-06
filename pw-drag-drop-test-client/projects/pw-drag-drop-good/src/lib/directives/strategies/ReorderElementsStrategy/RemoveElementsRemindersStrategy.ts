import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";

@Injectable()
export class RemoveElementsRemindersStrategy extends ReorderElementsOnMovingStrategyBase {
    constructor(
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    execute(model: ElementWithReference): void {

        this.removeMovingElementNewIndexAttribute(model.element);
        
        this.removeChildrenTransforms();
       
    }

    private removeChildrenTransforms = () => {

        var children = this.getAllChildren();

        children.forEach(child => {
            
            this.renderer.removeStyle(child, "transform");
        });

    }


}