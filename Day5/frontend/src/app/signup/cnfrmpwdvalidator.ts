import { AbstractControl } from '@angular/forms';

export function pwdvalidator (control: AbstractControl) {
    // console.log(control);
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfrmpwdval = control.value;
        const passcntrl = control.root.get('password');
        if (passcntrl) {
            const passValue = passcntrl.value;
            if (passValue !== cnfrmpwdval) {
                return {
                    isError: true
                };
            }
        }
    }
    return null;
}