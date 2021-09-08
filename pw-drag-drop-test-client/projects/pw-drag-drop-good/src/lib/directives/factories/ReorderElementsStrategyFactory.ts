import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { CollisionChecker } from "../common/helpers/CollisionChecker";
import { MouseListenerBetter } from "../listeners/MouseListener";
import { ISomething } from "../strategies/ISomething";
import { AdjustMovingElementPositionStrategy } from "../strategies/ReorderElementsStrategy/AdjustMovingElementPositionStrategy";
import { RemoveElementsRemindersStrategy } from "../strategies/ReorderElementsStrategy/RemoveElementsRemindersStrategy";
import { ReorderElementsOnMovingDownStrategy } from "../strategies/ReorderElementsStrategy/ReorderElementsOnMovingDownStrategy";
import { ReorderElementsOnMovingUpStrategy } from "../strategies/ReorderElementsStrategy/ReorderElementsOnMovingUpStrategy";
import { ReorderElementsStrategy } from "../strategies/ReorderElementsStrategy/ReorderElementsStrategy";
import { TryNotifyClientStrategy } from "../strategies/ReorderElementsStrategy/TryNotifyClientStrategy";
import { TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy } from "../strategies/ReorderElementsStrategy/TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy";

@Injectable()
export class ReorderElementsStrategyFactory {

    constructor(
        private mouseListener: MouseListenerBetter,
        private collisonChecker: CollisionChecker,
        private removeMovingElementRemindersStrategy: RemoveElementsRemindersStrategy,
        private adjustMovingElementPositionStrategy: AdjustMovingElementPositionStrategy,
        private tryNotifyClientStrategy: TryNotifyClientStrategy,
        private tryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy: TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy,
        private reorderElementsOnMovingDownStrategy: ReorderElementsOnMovingDownStrategy,
        private reorderElementsOnMovingUpStrategy: ReorderElementsOnMovingUpStrategy,
        private renderer: Renderer2,
        private element: ElementRef) {
    }


    create(): ReorderElementsStrategy {

        var res = new ReorderElementsStrategy(this.mouseListener, this.collisonChecker, this.removeMovingElementRemindersStrategy, this.adjustMovingElementPositionStrategy, this.tryNotifyClientStrategy, this.tryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy, this.reorderElementsOnMovingDownStrategy, this.reorderElementsOnMovingUpStrategy, this.renderer, this.element);

        return res;
    }

}