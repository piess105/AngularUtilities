import { EventEmitter } from "@angular/core";

export class EventEmitterSetterCaller<T> {

    private _emmiter?: (item: T) => void;
  
    set(emitter: EventEmitter<T>) {
  
      if (this._emmiter != undefined)
        return;
  
      this._emmiter = (item) => emitter.emit(item);
    }
  
    call(item: T) {
  
      if (this._emmiter == undefined)
        throw new Error("_emmiter has not been set use: set method to before call");
  
      this._emmiter(item);
    }
  }