import { Injectable } from "@angular/core";
import { IElementFacade } from "../facades/ElementFacade";

export interface IElementFacadeFactory {

    create(): IElementFacade;
}

//QUESTIONS
//Sens tej (i innych) fabryk
// Czy nie powinno być tak że fabryka zwraca mi element -nie obchodzi mnie jaki, w niej jest zawarta logika odpowiada za zwrocenie elementu  ?
// Czyli np. chce aby elementem który mi zwória był element aktualnie klikniety przez myszkę, więc muszę przekazać jakiegos providera który ten element mi dostarczy
// Czy dobrze kmienie?
@Injectable()
export class DraggingElementFacadeFactory implements IElementFacadeFactory {
    create(): IElementFacade {
        throw new Error("Method not implemented.");
    }




}