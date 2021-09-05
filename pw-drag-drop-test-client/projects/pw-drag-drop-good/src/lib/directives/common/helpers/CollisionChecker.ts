import { Injectable } from "@angular/core";

export class Rect {
    x!: number;
    y!: number;
    width!: number;
    height!: number
}

@Injectable({ providedIn: 'root' })
export class CollisionChecker {

    collides(one: Rect, two: Rect): boolean {

        if (one.x < two.x + two.width &&
            one.x + one.width > two.x &&
            one.y < two.y + two.height &&
            one.y + one.height > two.y) {

            return true;
        }

        return false;
    }

}