import { Injectable } from "@angular/core";
import { MouseElementListenerModel } from "../listeners/MouseElementListener";

@Injectable()
export class MouseMovingCache {

    private model: MouseElementListenerModel | undefined;

    set(model: MouseElementListenerModel) {
        this.model = model;
    }

    get() : MouseElementListenerModel | undefined{

        return this.model;
    }

    clear(){
        this.model = undefined;
    }
}