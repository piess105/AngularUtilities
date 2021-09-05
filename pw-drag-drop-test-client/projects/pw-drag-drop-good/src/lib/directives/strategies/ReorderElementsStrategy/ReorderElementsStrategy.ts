import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { CallOnce } from "../../common/helpers/CallOnce";
import { DirectionType, MovingDirectionDeterminerObservable } from "../../common/helpers/MovingDirectionDeterminer";
import { IObserver } from "../../interfaces/IObserver";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingDownStrategy } from "./ReorderElementsOnMovingDownStrategy";
import { ReorderElementsOnMovingUpStrategy } from "./ReorderElementsOnMovingUpStrategy";

@Injectable()
export class ReorderElementsStrategy implements IObserver {

    private movingElementStartingPosition: number = 0;
    private _movingElementReference!: ElementWithReference;

    private movingDirectionDeterminer: MovingDirectionDeterminerObservable = new MovingDirectionDeterminerObservable();

    constructor(
        private reorderElementsOnMovingDownStrategy : ReorderElementsOnMovingDownStrategy,
        private reorderElementsOnMovingUpStrategy: ReorderElementsOnMovingUpStrategy,
        private renderer: Renderer2,
        private element: ElementRef) {

        this.movingDirectionDeterminer.subscribe(this);
    }

    notified(type: DirectionType): void {

        this.refreshMovingElementPosition();
    }

    execute(model: ElementWithReference) {

        this.saveMovingElementReference(model);

        var movingDirection = this.movingDirectionDeterminer.determine(this.getElementTransformY(model.element));

        if (movingDirection == DirectionType.Up) {

            this.reorderElementsOnMovingUpStrategy.execute(model, this.movingElementStartingPosition);
        }
        else if (movingDirection == DirectionType.Down) {
            
            this.reorderElementsOnMovingDownStrategy.execute(model, this.movingElementStartingPosition);
        }
    }

    private refreshMovingElementPosition = () => {

        this.movingElementStartingPosition = this.getElementCenter(this._movingElementReference.element);
    }

    private saveMovingElementReference = (model: ElementWithReference) => {
        this._movingElementReference = model;
    }


    private getElementCenter = (element: Element): number => {

        var center = element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2;

        return center;

    }

    private getElementTransformY = (element: Element) => {

        var transform = new WebKitCSSMatrix(getComputedStyle(element).transform).f;
        return transform;
    }
}