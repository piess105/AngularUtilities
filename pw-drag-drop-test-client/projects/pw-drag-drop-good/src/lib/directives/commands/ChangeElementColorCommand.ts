import { Injectable, Renderer2 } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";

@Injectable()
export class ChangeElementColorCommand implements ICommand {

    constructor(private renderer : Renderer2){

    }

    execute(element: Element): void {
        
        this.renderer.setStyle(element, "background-color", "tomato");

    }
}