import { AbstractControl, ValidatorFn } from "@angular/forms";
export function dateValidator(dateForm: AbstractControl): {[key: string]: boolean} | null {
    const fromDate = dateForm.get('fromDate');
    const toDate = dateForm.get('toDate');
 
    if (fromDate.dirty && toDate.dirty) {
        return fromDate && toDate &&
        fromDate.value !== toDate.value ?
            { dateInvalid: true } : null;
    }
    else {
        return null;
    }
  }