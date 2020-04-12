import { AbstractControl } from "@angular/forms";

export const clearValidators = (formControl: AbstractControl) => {
    formControl.clearValidators();
    formControl.updateValueAndValidity();
};
