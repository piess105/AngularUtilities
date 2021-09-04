import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { ElementWithReference } from "../observables/ElementMoverObservable";

@Injectable()
export class ReorderElementsStrategy {

    private _movingElementIndex?: number;
    private _elemes: Element[] = [];
    private _elemes2: Element[] = [];

    constructor(
        private renderer: Renderer2,
        private element: ElementRef) {

    }

    execute(model: ElementWithReference) {

        var children = this.element.nativeElement.children;

        this.saveMovingElementIndex(model.element);

        if (this.movingUp(model.element)) {

            var savedElements = this.saveElementsThatTheirCentersAre_HIGHER_ThanMovingElementCenter(model.element);

            this.moveElementsDown(savedElements);
        }
        else {

            var savedElements = this.saveElementsThatTheirCentersAre_LOWER_ThanMovingElementCenter(model.element);

            this.moveElementsUp(savedElements);
        }

        //Zapisz Index poruszanego elementu ~~
        //Jeżeli poruszamy w górę ~
        //Wez elementy których środki są poniżej środka elementu którym ruszamy, z wyjątkiem (tutaj elementy które zostały poruszone).
        //Przesuń elementy w dół, dodaj do listy elementów poruszonych
        //
    }

    private moveElementsDown = (elements: Element[]) => {

        elements.forEach(element => {
            var margin = parseInt(getComputedStyle(element).marginTop);
            var move = (element.getBoundingClientRect().height + margin);
            var value = this.getElementTransformY(element) == 0 ? move : 0;

            this.renderer.setStyle(element, "transform", `translateY(${value}px)`);
        });
    }

    private moveElementsUp = (elements: Element[]) => {

        elements.forEach(element => {
            var margin = parseInt(getComputedStyle(element).marginTop);
            var move = (element.getBoundingClientRect().height + margin) * -1;
            var value = this.getElementTransformY(element) == 0 ? move : 0;

            this.renderer.setStyle(element, "transform", `translateY(${value}px)`);
        });
    }

    private saveElementsThatTheirCentersAre_HIGHER_ThanMovingElementCenter = (movingElement: Element): Element[] => {

        var properElements = this.getElementsThatTheirCentersAre_HIGHER_ThenMovingElementCenter(movingElement);

        return this.saveElementsThatAreNotSaved(properElements);
    };

    private saveElementsThatTheirCentersAre_LOWER_ThanMovingElementCenter = (movingElement: Element): Element[] => {

        var properElements = this.getElementsThatTheirCentersAre_LOWER_ThenMovingElementCenter(movingElement);

        return this.saveElementsThatAreNotSaved2(properElements);
    };

    private saveElementsThatAreNotSaved = (elements: Element[]): Element[] => {

        var res: Element[] = [];

        elements.forEach(element => {

            if (this._elemes.filter(x => x == element).length == 0) {
                res.push(element);
                this._elemes.push(element);

                var index = this._elemes2.indexOf(element);

                if (index != -1) {
                   
                    this._elemes2.splice(index, 1);
                }
            }
        });

        return res;
    }

    private saveElementsThatAreNotSaved2 = (elements: Element[]): Element[] => {

        var res: Element[] = [];

        elements.forEach(element => {

            if (this._elemes2.filter(x => x == element).length == 0) {
                res.push(element);
                this._elemes2.push(element);

                var index = this._elemes.indexOf(element);

                if (index != -1) {
                   console.log("CHIJ");
                    this._elemes.splice(index, 1);
                }


            }

        });

        return res;
    }

    private getElementsThatTheirCentersAre_HIGHER_ThenMovingElementCenter = (movingElement: Element) => {

        var movingElementCenter = this.getElementCenter(movingElement);
        var movingElementCenterIgnoringTransform = this.getElementCenterIgnoringTransform(movingElement);

        var res = this.getElementsWithConditionUsingTheirCenters((elementCenter, element) => movingElementCenter < elementCenter && (elementCenter < movingElementCenterIgnoringTransform || this.getElementTransformY(element) != 0))
        return res;
    };

    private getElementsThatTheirCentersAre_LOWER_ThenMovingElementCenter = (movingElement: Element) => {

        var movingElementCenter = this.getElementCenter(movingElement);
        var movingElementCenterIgnoringTransform = this.getElementCenterIgnoringTransform(movingElement);

        var res = this.getElementsWithConditionUsingTheirCenters((elementCenter, element) => movingElementCenter > elementCenter && (elementCenter > movingElementCenterIgnoringTransform || this.getElementTransformY(element) != 0))

        return res;
    };

    private getElementsWithConditionUsingTheirCenters(condition: (elementCenter: number, element: Element) => boolean): Element[] {

        var elementsExceptMovingOne = this.getAllChildrenExceptTheMovingOne();
        var centersOfElementsExceptMovingOne = this.getElementsCenters(elementsExceptMovingOne);

        var res: Element[] = [];

        for (var i = 0; i < elementsExceptMovingOne.length; i++) {

            var elementCenter = centersOfElementsExceptMovingOne[i];

            if (condition(elementCenter, elementsExceptMovingOne[i]))
                res.push(elementsExceptMovingOne[i]);
        }

        return res;
    }


    private getElementsCenters = (elements: Element[]): number[] => {

        var centers: number[] = [];

        elements.forEach(element => {
            centers.push(this.getElementCenter(element));
        });

        return centers;
    }

    private getElementCenter = (element: Element): number => {

        var center = element.getBoundingClientRect().y + element.getBoundingClientRect().height / 2;

        return center;

    }

    private getElementCenterIgnoringTransform = (element: Element) => {

        var center = this.getElementCenter(element);
        var transform = this.getElementTransformY(element);
        var res = center - transform;

        return res;
    };

    private getElementTransformY = (element: Element) => {

        var transform = new WebKitCSSMatrix(getComputedStyle(element).transform).f;
        return transform;
    }

    private saveMovingElementIndex = (movingElement: Element) => {

        if (this._movingElementIndex != undefined)
            return;

        var children = this.getAllChildren();

        for (var i = 0; i < children.length; i++) {

            if (children[i] == movingElement) {
                this._movingElementIndex = i;
                return;
            }
        }
    };

    private getAllChildren = (): Element[] => {

        var children = this.element.nativeElement.children;

        return children;
    }

    private getAllChildrenExceptTheMovingOne = (): Element[] => {

        var children = this.getAllChildren();

        var res: Element[] = [];

        for (var i = 0; i < children.length; i++) {

            if (i != this._movingElementIndex)
                res.push(children[i]);
        }

        return res;
    }

    private res = true;
    private prevVal ?: number ;
    private movingUp = (movingElement: Element): boolean => {

        var transform = this.getElementTransformY(movingElement);

        if(this.prevVal == undefined){
            this.prevVal = transform;
        }
        
        var isMovingUp = true;

        if(this.prevVal > transform){
            isMovingUp = true;
        }
        else{
            isMovingUp = false;
        }

        return isMovingUp;
    };
}