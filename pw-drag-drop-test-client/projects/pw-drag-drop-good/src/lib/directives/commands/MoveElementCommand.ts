import { Injectable } from "@angular/core";
import { MovableElementCache } from "../caches/MovableElementCache";
import { ICommand } from "./ICommand";

@Injectable()
export class MoveElementCommand implements ICommand {

    constructor(private cache : MovableElementCache){
        
    }

    execute(obj: any): void {

       
        var element = this.cache.get()[0];

        element.move(10,10);
    }

}