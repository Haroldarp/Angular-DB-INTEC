import {AbstractControl, FormGroup} from '@angular/forms';

export function ComfirmPassword(formGroup: FormGroup){
    if(formGroup.get('password').value && formGroup.get('comfirmPassword').value){
        if(formGroup.get('password').value != formGroup.get('comfirmPassword').value ){
            return {EqualPassword: true};
        }
    }
    return null;
}