import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";

export interface IMouseListener {
    mouseDown: ReplaySubject<MouseEvent>;
    mouseUp: ReplaySubject<MouseEvent>;
    mouseMove: ReplaySubject<MouseEvent>;
}

@Injectable()
export class MouseListener implements IMouseListener {
    mouseDown: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>();
    mouseUp: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>();
    mouseMove: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>();


}