import { ObservableBase } from "../../observables/ObservableBase";

export enum DirectionType {
    Unknown,
    Up,
    Down
}

export interface IMovingDirectionDeterminer {
    determine(value: number): DirectionType;
}

export class MovingDirectionDeterminer implements IMovingDirectionDeterminer {

    private prevValue?: number;
    private prevDirectionType: DirectionType = DirectionType.Unknown;

    determine(value: number): DirectionType {

        if (this.prevValue == undefined) {

            this.prevValue = value;

            return DirectionType.Unknown;
        }

        var res = this.prevDirectionType;

        if (this.prevValue < value) {
            res = DirectionType.Down;
        }
        else if (this.prevValue > value) {
            res = DirectionType.Up;
        }

        this.prevValue = value;
        this.prevDirectionType = res;

        return res;
    }
}

export class MovingDirectionDeterminerObservable extends ObservableBase implements IMovingDirectionDeterminer {

    private prevDirectionType: DirectionType = DirectionType.Unknown;

    constructor(private determiner: MovingDirectionDeterminer = new MovingDirectionDeterminer()) {
        super()
    }

    determine(value: number): DirectionType {

        var determine = this.determiner.determine(value);

        if (this.prevDirectionType != determine) {

            this.prevDirectionType = determine;
            this.notify(determine);
        }

        return determine;
    }


}
