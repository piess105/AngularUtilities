import { Injectable, Renderer2 } from "@angular/core";
import { ObservableBase } from "./ObservableBase";

@Injectable()
export class ElementMoverObservable extends ObservableBase
{
    constructor(private renderer : Renderer2){
        super();
    }

    move(element : Element, x : number, y : number){

        this.renderer.setStyle(element, "transform", `translate(${x}px, ${y}px)`);

        this.notify(element);
    }
}