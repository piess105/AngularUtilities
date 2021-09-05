import { CollisionChecker } from "./CollisionChecker";

describe('CollisonChecker', () => {


    it('collides', () => {

        var rect1 = { x: 5, y: 5, width: 50, height: 50 }
        var rect2 = { x: 20, y: 10, width: 10, height: 10 }


        var checker = new CollisionChecker();

        var res = checker.collides(rect1, rect2);
        expect(true).toBe(res);

    });

});