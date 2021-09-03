import { Injectable } from "@angular/core";

export class StateAction {
    wake!: () => void;
    sleep!: () => void
  }
  
  export abstract class StateRegister<T> {
  
    constructor(private configuration: StateConfigurationBase<T>) {
  
    }
  
    register(value: T, onWake: () => void, onSleep: () => void) {
  
      this.configuration.add(value, { wake: onWake, sleep: onSleep });
    }
  }
  
  export abstract class StateConfigurationBase<T> {
    private map: Map<T, StateAction[]> = new Map<T, StateAction[]>();
  
    add(value: T, action: StateAction) {
  
      if (!this.map.has(value))
        this.map.set(value, []);
  
      var concrete = this.map.get(value);
  
      concrete?.push(action);
    }
  
    getActions(value: T): StateAction[] {
  
      return this.map.get(value)!;
    }
  }
  
  export abstract class StateChanger<T> {
  
    private current?: T = undefined;
  
  
    constructor(private configuration: StateConfigurationBase<T>) {
  
    }
  
    change(value: T) {
  
      if (this.current == undefined) {
  
        this.wake(value);
      }
      else {
  
        this.sleep(this.current);
        this.wake(value);
      }
  
      this.current = value;
    }
  
    private wake(value: T) {
  
      var actions = this.configuration.getActions(value);
  
      actions.forEach(action => {
        action.wake();
      });
    }
  
    private sleep(value: T) {
  
      var actions = this.configuration.getActions(value);
  
      actions.forEach(action => {
        action.sleep();
      });
    }
  }