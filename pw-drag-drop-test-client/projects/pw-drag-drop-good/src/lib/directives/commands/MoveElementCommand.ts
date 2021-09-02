import { Injectable, Renderer2 } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";
import { ElementPositionModel } from "../models/ElementPositionModel";
import { ElementMoverObservable } from "../observables/ElementMoverObservable";



@Injectable()
export class MoveElementCommand implements ICommand {

    constructor(
        private mover : ElementMoverObservable,
        private renderer : Renderer2) {

    }

    execute(model : ElementPositionModel): void {

        this.mover.move(model.element, model.x, model.y);

    }

}