import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { CallOnce } from "../../common/helpers/CallOnce";
import { CollisionChecker } from "../../common/helpers/CollisionChecker";
import { DirectionType, MovingDirectionDeterminerNotifiesWhenDirectionChange } from "../../common/helpers/MovingDirectionDeterminer";
import { IObserver } from "../../interfaces/IObserver";
import { MouseListenerBetter } from "../../listeners/MouseListener";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";
import { ReorderElementsOnMovingDownStrategy } from "./ReorderElementsOnMovingDownStrategy";
import { ReorderElementsOnMovingUpStrategy } from "./ReorderElementsOnMovingUpStrategy";
import { ResetElementsOnMovingStrategy } from "./ResetElementsOnMovingStrategy";
import { TryNotifyClientStrategy } from "./TryNotifyClientStrategy";

@Injectable()
export class ReorderElementsStrategy implements IObserver {

    private _movingElementStartingPosition: number = 0;
    private _movingElementReference!: ElementWithReference;

    private _movingDirectionDeterminer: MovingDirectionDeterminerNotifiesWhenDirectionChange = new MovingDirectionDeterminerNotifiesWhenDirectionChange();

    constructor(
        mouseListener: MouseListenerBetter,
        private collisonChecker: CollisionChecker,
        private tryNotifyClientStrategy : TryNotifyClientStrategy,
        private resetElementsOnMovingStrategy: ResetElementsOnMovingStrategy,
        private reorderElementsOnMovingDownStrategy: ReorderElementsOnMovingDownStrategy,
        private reorderElementsOnMovingUpStrategy: ReorderElementsOnMovingUpStrategy,
        private renderer: Renderer2,
        private element: ElementRef) {

        this._movingDirectionDeterminer.subscribe(this);

        mouseListener.mouseUp.subscribe(x => this.onMouseUp(x));
    }

    onMouseUp(event: MouseEvent): void {

        this.tryNotifyClientStrategy.execute(this._movingElementReference);
    }

    notified(type: DirectionType): void {

        this.refreshMovingElementPosition();
    }

    execute(model: ElementWithReference) {

        this.saveMovingElementReference(model);

        if (this.isMovingElementInsideParent()) {

            var movingElementDirection = this.getMovingElementDirection(model.element);

            if (movingElementDirection == DirectionType.Up) {

                this.reorderElementsOnMovingUpStrategy.execute(model, this._movingElementStartingPosition);
            }
            else if (movingElementDirection == DirectionType.Down) {

                this.reorderElementsOnMovingDownStrategy.execute(model, this._movingElementStartingPosition);
            }
        }
        else {
            this.resetElementsOnMovingStrategy.execute(model);
        }
    }

    private getMovingElementDirection = (movingElement: Element) => {

        var movingDirection = this._movingDirectionDeterminer.determine(this.getElementTransformY(movingElement));

        return movingDirection;
    }

    private isMovingElementInsideParent = (): boolean => {

        var isColliding = this.collisonChecker.collides(this._movingElementReference.element.getBoundingClientRect(), this.element.nativeElement.getBoundingClientRect());

        return isColliding;
    }


    private refreshMovingElementPosition = () => {

        this._movingElementStartingPosition = this.getElementCenter(this._movingElementReference.element);
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