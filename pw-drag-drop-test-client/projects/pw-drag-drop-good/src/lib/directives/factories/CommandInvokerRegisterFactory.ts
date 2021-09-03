import { Injectable, Injector } from "@angular/core";
import { CommandInvokerRegister } from "../invokers/CommandInvoker";

@Injectable()
export class CommandInvokerRegisterFactory{

    constructor(private injector : Injector){

    }

    create() : CommandInvokerRegister
    {
        var res = new CommandInvokerRegister(this.injector);

        return res;
    }
}