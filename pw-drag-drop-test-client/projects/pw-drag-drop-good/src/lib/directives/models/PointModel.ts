export class PointModel{
    x! : number;
    y! : number;

    static create(x : number, y : number) : PointModel{
        
        return {x : x , y : y};
    }
}