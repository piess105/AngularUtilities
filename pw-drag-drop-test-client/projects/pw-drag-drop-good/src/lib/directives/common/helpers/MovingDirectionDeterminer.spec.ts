import { IObserver } from "../../interfaces/IObserver";
import { DirectionType, MovingDirectionDeterminer, MovingDirectionDeterminerNotifiesWhenDirectionChange } from "./MovingDirectionDeterminer";

describe('MovingDirectionDeterminer', () => {

    it('determine', () => {

        var cases = [
            {
                values: [1, 2, 3],
                expectedResult: DirectionType.Down
            },
            {
                values: [1],
                expectedResult: DirectionType.Unknown
            },
            {
                values: [5, 4, 3, 2],
                expectedResult: DirectionType.Up
            },
            {
                values: [1, 2, 3, 3, 3, 3],
                expectedResult: DirectionType.Down
            },
            {
                values: [1, 1, 1, 1],
                expectedResult: DirectionType.Unknown
            },
            {
                values: [4, 3, 2, 2, 2, 2],
                expectedResult: DirectionType.Up
            },
            {
                values: [1, 1, 2, 2, 1, 1],
                expectedResult: DirectionType.Up
            },
            {
                values: [5, 5, 4, 4, 5, 5],
                expectedResult: DirectionType.Down
            }
        ];

        cases.forEach(c => {

            var determiner = new MovingDirectionDeterminer();

            var result: DirectionType = DirectionType.Unknown;

            c.values.forEach(value => {

                result = determiner.determine(value);
            });

            expect(DirectionType[result]).toBe(DirectionType[c.expectedResult]);
        });

    })

});

describe('MovingDirectionDeterminerNotifiesWhenDirectionChange', () => {

    it('determine', () => {

        var cases = [
            {
                values: [1, 2, 3],
                callCountExpectedResult: 1
            },
            {
                values: [1, 1, 1],
                callCountExpectedResult: 0
            },
            {
                values: [1, 2, 1, 2],
                callCountExpectedResult: 3
            },
            {
                values: [1, 1, 2, 1],
                callCountExpectedResult: 2
            }

        ];

        cases.forEach(c => {

            var callCount = 0;

            var determiner = new MovingDirectionDeterminerNotifiesWhenDirectionChange();
            determiner.subscribe(new ObserverTestClass(() => {
                callCount++;

            }));

            c.values.forEach(value => {

                determiner.determine(value);
            });

            expect(c.callCountExpectedResult).toBe(callCount);

        });



    });

})

class ObserverTestClass implements IObserver {

    constructor(private predicate: (obj: any) => void) {

    }

    notified(obj: any): void {

        this.predicate(obj);
    }

}