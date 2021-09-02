import { Injectable } from "@angular/core";
import { ICommand } from "../interfaces/ICommand";

@Injectable()
export class ChangeElementColorCommand implements ICommand {


    execute(obj: any): void {
        
        console.log("PIS");
        obj.move(0,0);
    }
}