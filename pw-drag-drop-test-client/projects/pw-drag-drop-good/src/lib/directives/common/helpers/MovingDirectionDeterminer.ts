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

export class MovingDirectionDeterminerNotifiesWhenDirectionChange extends ObservableBase implements IMovingDirectionDeterminer {

    private prevDirection: DirectionType = DirectionType.Unknown;

    constructor(private determiner: MovingDirectionDeterminer = new MovingDirectionDeterminer()) {
        super()
    }

    determine(value: number): DirectionType {

        var currentDirection = this.determiner.determine(value);

        if (this.prevDirection != currentDirection) {

            this.prevDirection = currentDirection;
            this.notify(currentDirection);
        }

        return currentDirection;
    }


}
