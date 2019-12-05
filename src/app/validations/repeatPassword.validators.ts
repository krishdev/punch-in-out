import { AbstractControl } from '@angular/forms';

export function PasswordConfirmValidator(control: AbstractControl) {
  if(void 0 === control){ return null; }
  if(
    void 0 !== control.parent &&
    void 0 !== control.parent.controls &&
    void 0 !== control.parent.controls['password'] &&
    control.parent.controls['password'].value === control.value
  ){
    return null;
  }
  return {passwordMatches: true};
}