import { Injectable } from "@angular/core";
import { IDisposable } from "../interfaces/IDisposable";
import { IObservable, IObserver, IObserverElementDisposable } from "../interfaces/IObserver";
import { MouseListenerBetter } from "../listeners/MouseListener";
import { MousePosition } from "../models/MousePosition";
import { ElementWithReference } from "../observables/ElementMoverObservable";
import { GlobalElementMovementObservable } from "../observables/GlobalElementMoverObservable";
import { ObservableBase, ObservableBaseGeneric, ObserverAction } from "../observables/ObservableBase";
import { PwContainerDirective } from "../pw-container.directive";



@Injectable({ providedIn: 'root' })
export class NotifiesOnlyOneContainerAtATimeDictributor extends ObservableBaseGeneric<IObserverElementDisposable> {

    private _theMostTopContainer?: Element;
    private _firstTheMostTopContainer?: Element = undefined;
    private _currentObserver?: IObserverElementDisposable;

    constructor(
        mouseListener: MouseListenerBetter,
        observable: GlobalElementMovementObservable) {
        super();


        mouseListener.mouseMove.subscribe(x => this.onMouseMove(x));
        observable.subscribe(new ObserverAction(x => this.onElementMoved(x)));
        observable.subscribe(new ObserverAction(x => this.onMouseUp(x)));

    }

    onMouseUp(x: any): void {

        //TODO: Invoke when DragFinished
        setTimeout(() => {
            this._currentObserver = undefined;
            this._theMostTopContainer = undefined;
            this._firstTheMostTopContainer = undefined;
        }, 500); 
    }

    private onMouseMove(event: MouseEvent): void {

        var elementsWithPwContainerAttribute = this.getElementsHavingPwContainerAttribute(event);

        this.trySaveElementWithPwContainerAttributeThatIsTheMostTop(elementsWithPwContainerAttribute);
    }



    private onElementMoved(element: ElementWithReference) {

        if (!this.isAnyOfTopMostContainersSaved())
            return;

        this.saveTheFirstMostTopContainerOccurence();

        var elementInContainer = this.getTheContainerThatTheMovingElementIsAlreadyIn();

        this.saveTheCurrentObserverIfUndefined(elementInContainer!);

        this.trySwitchTheCurrentObserver_AND_CallDisposeOnBefore(elementInContainer!);

        this._currentObserver?.notified(element);
    }


    private trySaveElementWithPwContainerAttributeThatIsTheMostTop = (elementsWithPwContainerAttribute : Element[]) => {

        if (elementsWithPwContainerAttribute.length == 0) {
            this.removeTheMostTopContainer();
            return;
        }

        this.saveTheMostTopContainer(elementsWithPwContainerAttribute);
    }


    private removeTheMostTopContainer = () => {
        this._theMostTopContainer = undefined;
    }

    private saveTheMostTopContainer = (elementsContainingPwAttribute: Element[]) => {

        this._theMostTopContainer = elementsContainingPwAttribute[0];
    }

    private getElementsHavingPwContainerAttribute = (event: MouseEvent) => {

        var elements = document.elementsFromPoint(event.clientX, event.clientY);

        var elementsHavingPwContainerAttribute = elements.filter(x => x.hasAttribute("pw-container"));

        return elementsHavingPwContainerAttribute;
    }


    private saveTheCurrentObserverIfUndefined = (observer: IObserverElementDisposable) => {

        if (this._currentObserver == undefined)
            this._currentObserver = observer;
    }

    private trySwitchTheCurrentObserver_AND_CallDisposeOnBefore = (observer: IObserverElementDisposable) => {

        if (this._currentObserver != observer) {

            this._currentObserver?.dispose()
            this._currentObserver = observer;
        }
    }

    private getTheContainerThatTheMovingElementIsAlreadyIn = () => {

        var res = this.getMostTop_OR_FirstMostTop_Container();

        var observerRepresentinContainer = this.getObserverRepresentingContainer(res!);

        return observerRepresentinContainer;
    }

    private getObserverRepresentingContainer = (container: Element): IObserverElementDisposable | undefined => {

        var res = this.observers.filter(x => x.element.nativeElement == container);

        if (res.length == 0)
            return undefined;

        return res[0];
    }

    private getMostTop_OR_FirstMostTop_Container = () => {
        var res = this._theMostTopContainer == undefined ? this._firstTheMostTopContainer : this._theMostTopContainer;

        return res;
    }


    private isAnyOfTopMostContainersSaved = () => {

        if (this._theMostTopContainer != undefined || this._firstTheMostTopContainer != undefined)
            return true;

        return false;
    }

    private saveTheFirstMostTopContainerOccurence = () => {
        if (this._firstTheMostTopContainer == undefined) {
            this._firstTheMostTopContainer = this._theMostTopContainer;
        }
    }



}