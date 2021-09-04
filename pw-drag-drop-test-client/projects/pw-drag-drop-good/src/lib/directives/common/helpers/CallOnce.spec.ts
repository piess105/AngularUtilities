import { CallOnce } from "./CallOnce";

describe('CallOnce', () => {

    it('IF', () => {


        var cases = [
            {
                conditions: [true, true, false, false,],
                valueToIncrement: 0,
                expectedValueToIncrement: 0
            },
            {
                conditions: [true, false, true, false,],
                valueToIncrement: 0,
                expectedValueToIncrement: 0
            },
            {
                conditions: [true, true, true, true,],
                valueToIncrement: 0,
                expectedValueToIncrement: 1
            },
            {
                conditions: [false, false, false, false,],
                valueToIncrement: 0,
                expectedValueToIncrement: -1
            }
        ]

        cases.forEach(c => {

            var callOnce = new CallOnce();
            //Increments the value on true, Decrement the value on false
            c.conditions.forEach(condition => {
                callOnce.Call(() => condition, () => c.valueToIncrement++, () => c.valueToIncrement--)
            });

            expect(c.valueToIncrement).toBe(c.expectedValueToIncrement);
        });

    })

});