import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { MouseListenerBetter } from "../listeners/MouseListener";
import { MousePosition } from "../models/MousePosition";
import { PwContainerDirectiveOutputsCaller } from "../pw-container.directive";
import { TryConsumeSuppliedElementStrategy } from "../strategies/TryConsumeSuppliedElementStrategy";

@Injectable()
export class TryConsumeSuppliedElementStrategyFactory {

    constructor(
        private directiveOutputCalled: PwContainerDirectiveOutputsCaller,
        private mouseListener: MouseListenerBetter,
        private mousePosition: MousePosition,
        private element: ElementRef,
        private renderer: Renderer2) {
    }

    create(): TryConsumeSuppliedElementStrategy {

        var res = new TryConsumeSuppliedElementStrategy(this.directiveOutputCalled, this.mouseListener, this.mousePosition, this.element, this.renderer);

        return res;
    }
}