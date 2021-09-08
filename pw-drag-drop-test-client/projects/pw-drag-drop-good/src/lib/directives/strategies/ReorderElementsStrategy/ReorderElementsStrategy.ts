import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { CallOnce } from "../../common/helpers/CallOnce";
import { CollisionChecker } from "../../common/helpers/CollisionChecker";
import { DirectionType, MovingDirectionDeterminerNotifiesWhenDirectionChange } from "../../common/helpers/MovingDirectionDeterminer";
import { DirectiveType } from "../../enums/DirectiveType";
import { IObserver } from "../../interfaces/IObserver";
import { MouseListenerBetter } from "../../listeners/MouseListener";
import { ElementWithReference } from "../../observables/ElementMoverObservable";
import { AdjustMovingElementPositionStrategy } from "./AdjustMovingElementPositionStrategy";
import { ReorderElementsOnMovingStrategyBase } from "./ReodrerElementsOnMovingStrategyBase";
import { ReorderElementsOnMovingDownStrategy } from "./ReorderElementsOnMovingDownStrategy";
import { ReorderElementsOnMovingUpStrategy } from "./ReorderElementsOnMovingUpStrategy";
import { TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy } from "./TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy";
import { TryNotifyClientStrategy } from "./TryNotifyClientStrategy";
import { RemoveElementsRemindersStrategy } from "./RemoveElementsRemindersStrategy";
import { ISomething } from "../ISomething";
import { Subscription } from "rxjs";

@Injectable()
export class ReorderElementsStrategy implements ISomething {

    private _movingElementStartingPosition: number = 0;
    private _movingElementReference?: ElementWithReference;
    private subscription! : Subscription;

    private _movingDirectionDeterminer: MovingDirectionDeterminerNotifiesWhenDirectionChange = new MovingDirectionDeterminerNotifiesWhenDirectionChange();

    constructor(
        mouseListener: MouseListenerBetter,
        private collisonChecker: CollisionChecker,
        private removeMovingElementRemindersStrategy: RemoveElementsRemindersStrategy,
        private adjustMovingElementPositionStrategy: AdjustMovingElementPositionStrategy,
        private tryNotifyClientStrategy: TryNotifyClientStrategy,
        private tryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy: TryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy,
        private reorderElementsOnMovingDownStrategy: ReorderElementsOnMovingDownStrategy,
        private reorderElementsOnMovingUpStrategy: ReorderElementsOnMovingUpStrategy,
        private renderer: Renderer2,
        private element: ElementRef) {

        this._movingDirectionDeterminer.subscribe(this);

        this.subscription = mouseListener.mouseUp.subscribe(x => this.onMouseUp(x));
    }

    dispose(): void {
        
        this.subscription.unsubscribe();
    }

    private onMouseUp(event: MouseEvent): void {
       
        if (this._movingElementReference == undefined)
            return;

        this.adjustMovingElementPositionStrategy.execute(this._movingElementReference, this._movingElementStartingPosition);
        this.tryNotifyClientStrategy.execute(this._movingElementReference);
        this.removeMovingElementRemindersStrategy.execute(this._movingElementReference);

        this.removeMovingElementReference();
    }

    notified(type: DirectionType): void {

        this.refreshMovingElementStartingPosition();
    }

    execute(model: ElementWithReference) {

        this.saveMovingElementReference(model);

        if (this.isMovingElementInsideParent()) {

            this.doUpOrDownBehaviorDependingOnMovingElementDirection(model);
        }
        else {
            this.tryResetNoneMovingElementsTransformsAndRemoveNewIndexAttributeStrategy.execute(model);
        }
    }

    private doUpOrDownBehaviorDependingOnMovingElementDirection = (model: ElementWithReference) => {

        var movingElementDirection = this.getMovingElementDirection();

        if (movingElementDirection == DirectionType.Up) {

            this.reorderElementsOnMovingUpStrategy.execute(model, this._movingElementStartingPosition);
        }
        else if (movingElementDirection == DirectionType.Down) {

            this.reorderElementsOnMovingDownStrategy.execute(model, this._movingElementStartingPosition);
        }
    }

    private removeMovingElementReference = () => {
        this._movingElementReference = undefined;
    }

    private getMovingElementDirection = (): DirectionType => {

        var movingDirection = this._movingDirectionDeterminer.determine(this.getElementTransformY(this._movingElementReference?.element!));

        return movingDirection;
    }

    private isMovingElementInsideParent = (): boolean => {

        var isColliding = this.collisonChecker.collides(this._movingElementReference!.element.getBoundingClientRect(), this.element.nativeElement.getBoundingClientRect());

        return isColliding;
    }


    private refreshMovingElementStartingPosition = () => {

        this._movingElementStartingPosition = this.getElementCenter(this._movingElementReference!.element);
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