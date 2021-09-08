import { IDisposable } from "../interfaces/IDisposable";
import { ElementWithReference } from "../observables/ElementMoverObservable";

export interface ISomething extends IDisposable {

    execute(model: ElementWithReference): void; 
    
}