import { Injectable, Renderer2 } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";
import { ElementPositionModel } from "../models/ElementPositionModel";



@Injectable()
export class MoveElementCommand implements ICommand {

    constructor(
        private renderer : Renderer2) {

    }

    execute(zomo : ElementPositionModel): void {

        this.renderer.setStyle(zomo.element, "transform", `translate(${zomo.x}px, ${zomo.y}px)`);

    }

}