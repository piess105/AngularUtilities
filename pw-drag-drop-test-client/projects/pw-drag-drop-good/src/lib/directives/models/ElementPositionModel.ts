export class ElementPositionModel{
    element !: Element;
    x! : number;
    y! : number;

    static create(element : Element, x : number, y : number) : ElementPositionModel{

        return {element : element, x : x, y : y};
    }
}