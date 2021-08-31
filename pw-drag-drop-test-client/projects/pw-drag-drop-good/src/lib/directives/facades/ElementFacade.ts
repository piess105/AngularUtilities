export interface IElementFacade {

    move(x: number, y: number): void;
}

export class ElementFacade implements IElementFacade {

    constructor(element: Element) {

    }

    move(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }

}