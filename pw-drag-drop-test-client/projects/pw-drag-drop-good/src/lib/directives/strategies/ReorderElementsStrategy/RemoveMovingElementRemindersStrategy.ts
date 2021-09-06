import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";

@Injectable()
export class RemoveMovingElementRemindersStrategy extends ReorderElementsOnMovingStrategyBase {
    constructor(
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    execute(model: ElementWithReference): void {

        this.removeMovingElementNewIndexAttribute(model.element);
        
    }

}