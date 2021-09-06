import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { PwContainerDirectiveOutputsCaller } from "../../pw-container.directive";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";

export class UpdateModel {
    item!: any;
    newIndex!: number;
}

@Injectable()
export class TryNotifyClientStrategy extends ReorderElementsOnMovingStrategyBase {

    constructor(
        private outputsCaller: PwContainerDirectiveOutputsCaller,
        renderer: Renderer2,
        element: ElementRef
    ) {
        super(renderer, element);
    }

    execute(model: ElementWithReference): void {

        if (!this.canNotify(model.element))
            return;

        this.notifyClient(model);
    }

    private notifyClient = (model: ElementWithReference) => {

        var newIndex = this.getMovingElementNewIndexValue(model.element);

        this.outputsCaller.updateElementCalled.call(<UpdateModel>{ item: model.reference, newIndex: newIndex });
    }

    private canNotify = (movingElement: Element): boolean => {

        if (!this.hasMovingElementNewIndexAttributeAssigned(movingElement))
            return false;


        return true;
    }

    private hasMovingElementNewIndexAttributeAssigned = (movingElement: Element): boolean => {

        var newIndex = this.getMovingElementNewIndexValue(movingElement);

        return newIndex != undefined;
    }


}