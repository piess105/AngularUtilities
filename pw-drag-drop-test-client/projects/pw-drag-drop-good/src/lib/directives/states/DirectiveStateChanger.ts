import { Injectable } from "@angular/core";
import { DirectiveType } from "../enums/DirectiveType";
import { StateChangerBase, StateConfigurationBase, StateRegisterBase } from "./StateChangerBase";

@Injectable({ providedIn: 'root' })
export class DirectiveStateConfiguration extends StateConfigurationBase<DirectiveType>
{

}

@Injectable({ providedIn: 'root' })
export class DirectiveStateChanger extends StateChangerBase<DirectiveType>{
    constructor(configuration: DirectiveStateConfiguration) {
        super(configuration);
    }
}

@Injectable({ providedIn: 'root' })
export class DirectiveStateRegister extends StateRegisterBase<DirectiveType>{

    constructor(configuration: DirectiveStateConfiguration) {
        super(configuration);
    }
}

