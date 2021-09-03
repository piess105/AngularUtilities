import { Injectable } from "@angular/core";
import { DirectiveType } from "../enums/DirectiveType";
import { StateChanger, StateConfigurationBase, StateRegister } from "./StateChanger";

@Injectable({ providedIn: 'root' })
export class DirectiveStateConfiguration extends StateConfigurationBase<DirectiveType>
{

}

@Injectable({ providedIn: 'root' })
export class DirectiveStateChanger extends StateChanger<DirectiveType>{
    constructor(configuration: DirectiveStateConfiguration) {
        super(configuration);
    }
}

@Injectable({ providedIn: 'root' })
export class DirectiveStateRegister extends StateRegister<DirectiveType>{

    constructor(configuration: DirectiveStateConfiguration) {
        super(configuration);
    }
}

