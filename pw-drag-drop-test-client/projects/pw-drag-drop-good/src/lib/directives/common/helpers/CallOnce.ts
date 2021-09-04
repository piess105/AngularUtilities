export class CallOnce {

    private _prevConditionResult?: boolean;
  
    Call(condition: () => boolean, ifConditonTrue: () => void, ifConditionFalse: () => void) {
  
      var conditionResult = condition();
  
      var prevConditionResultIsUndefined_Or_ConditionsHasOpositeSates = () => this._prevConditionResult === undefined || conditionResult != this._prevConditionResult;
  
      if (prevConditionResultIsUndefined_Or_ConditionsHasOpositeSates()) {
        this._prevConditionResult = conditionResult;
      } else if (conditionResult == this._prevConditionResult) {
        return;
      }
  
      if (conditionResult == true) {
        ifConditonTrue();
      }
      else{
        ifConditionFalse();
      }
    }
  }