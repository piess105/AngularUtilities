import { Injectable } from "@angular/core";

export class StateAction {
    wake!: () => void;
    sleep!: () => void
  }
  
  
  
  @Injectable({ providedIn: 'root' })
  export class StateRegister {
  
    constructor(private configuration: StateConfiguration) {
  
    }
  
    register(value: number, onWake: () => void, onSleep: () => void) {
  
      this.configuration.add(value, { wake: onWake, sleep: onSleep });
    }
  }
  
  @Injectable({ providedIn: 'root' })
  export class StateConfiguration {
    private map: Map<number, StateAction[]> = new Map<number, StateAction[]>();
  
    add(value: number, action: StateAction) {
  
      if (!this.map.has(value))
        this.map.set(value, []);
  
      var concrete = this.map.get(value);
  
      concrete?.push(action);
    }
  
    getActions(value: number): StateAction[] {
  
      return this.map.get(value)!;
    }
  }
  
  @Injectable({ providedIn: 'root' })
  export class StateChanger {
  
    private current: number = -1;
  
  
    constructor(private configuration: StateConfiguration) {
  
    }
  
    change(value: number) {
  
      if (this.current == -1) {
  
        this.wake(value);
      }
      else {
  
        this.sleep(this.current);
        this.wake(value);
      }
  
      this.current = value;
    }
  
    private wake(value: number) {
  
      var actions = this.configuration.getActions(value);
  
      actions.forEach(action => {
        action.wake();
      });
    }
  
    private sleep(value: number) {
  
      var actions = this.configuration.getActions(value);
  
      actions.forEach(action => {
        action.sleep();
      });
    }
  }