import { Injectable } from "@angular/core";
import { MovableElement } from "../models/MovableElement";
import { ICommand } from "./ICommand";

@Injectable()
export class ChangeElementColorCommand implements ICommand {


    execute(obj: MovableElement): void {
        
        console.log("PIS");
        obj.move(0,0);
    }
}