import { Injectable } from "@angular/core";
import { MouseMovingCache } from "../caches/MouseMovingCache";
import { MovableElementCache } from "../caches/MovableElementCache";
import { ICommand } from "./ICommand";

@Injectable()
export class MoveElementCommand implements ICommand {

    constructor(
        private mouseMovementCache: MouseMovingCache,
        private cache: MovableElementCache) {

    }

    execute(obj: any): void {

        var element = this.cache.get()[0];

        var cache = this.mouseMovementCache.get();

        if (cache == undefined)
            return;

        
        var x = cache.currentPoint.x - cache.startingPoint.x;
        var y = cache.currentPoint.y - cache.startingPoint.y;

        element.move(x,y);

    }

}