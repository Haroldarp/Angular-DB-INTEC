import {AbstractControl, FormGroup} from '@angular/forms';

export function UserValidator(formGroup: FormGroup){
    if(formGroup.get('username').value && formGroup.get('password').value){
        if(formGroup.get('username').value != '1088464' || formGroup.get('password').value != '12345'){
            return {validUser: true};
        }
    }
    return null;
}