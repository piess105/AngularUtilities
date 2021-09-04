import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { CallOnce } from "../common/helpers/CallOnce";
import { MouseListenerBetter } from "../listeners/MouseListener";
import { MousePosition } from "../models/MousePosition";
import { ElementWithReference } from "../observables/ElementMoverObservable";
import { PwContainerDirectiveOutputCaller } from "../pw-container.directive";

@Injectable()
export class TryConsumeSuppliedElementStrategy {

    private callOnce: CallOnce = new CallOnce();
    private _suppliedElementReference?: ElementWithReference;

    constructor(
        private directiveOutputCalled : PwContainerDirectiveOutputCaller,
        private mouseListener: MouseListenerBetter,
        private mousePosition: MousePosition,
        private element: ElementRef,
        private renderer: Renderer2) {

        this.mouseListener.mouseUp.subscribe(x => this.onMouseUp(x));
    }

    execute(model: ElementWithReference) {

        this.callOnce.Call(
            () => this.collisionHasBeenDetected(model.element),
            () => {

                this.changeTheElementBorderColor();
                this.saveSuppliedElementReference(model);
            },
            () => {

                this.undoChangeTheElementBorderColor();
                this.removeSuppliedElementReference();
            });
    }

    private onMouseUp(event: MouseEvent) {
        if (this.hasSavedSuppliedElementReference()) {

            this.consumeSuppliedElement();
        }
    }

    //#region HelperMethods

    private detectCollision(x: number, y: number, collider: Element): boolean {

        var rect = collider.getBoundingClientRect();

        if (x < rect.x) return false;
        if (x > rect.x + rect.width) return false;
        if (y < rect.y) return false;
        if (y > rect.y + rect.height) return false;


        return true;
    }

    //#endregion

    //#region Actions

    consumeSuppliedElement = () => {
        
        this.renderer.setStyle(this._suppliedElementReference?.element, "opacity", "0");

        this.directiveOutputCalled.callAddElementCalled(this._suppliedElementReference?.reference);        
    }

    collisionHasBeenDetected = (element: Element) => {

        return this.detectCollision(this.mousePosition.x, this.mousePosition.y, this.element.nativeElement);
    }


    changeTheElementBorderColor = () => {
        this.renderer.setStyle(this.element.nativeElement, "border", "1px solid tomato");
    }

    saveSuppliedElementReference = (element: ElementWithReference) => {
        this._suppliedElementReference = element;
    };

    removeSuppliedElementReference = () => {
        this._suppliedElementReference = undefined;
    };

    undoChangeTheElementBorderColor = () => {
        this.renderer.removeStyle(this.element.nativeElement, "border");
    }

    hasSavedSuppliedElementReference = (): boolean => {

        return this._suppliedElementReference != undefined;
    };

    //#endregion
}