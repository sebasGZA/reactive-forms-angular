import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        const field = form.controls[fieldName];
        return (!!field.errors) && field.touched
    }

    static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
        const array = formArray.controls[index];
        return (!!array.errors) && array.touched;
    }

    static getErrors(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'This field is required'
                case 'minlength':
                    return `The field must contain ${errors['minlength'].requiredLength} or more characters`
                case 'min':
                    return `The value must be greater than ${errors['min'].min}`
                case 'email':
                    return 'Please enter a valid email address';
            }
        }
        return null;
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        const field = form.controls[fieldName];
        if (!field) return null;
        const errors = field.errors ?? {};
        return this.getErrors(errors);
    }

    static getInArrayError(formArray: FormArray, index: number): string | null {
        const array = formArray.controls[index];
        if (!array) return null;
        const errors = array.errors ?? {}
        return this.getErrors(errors);
    }
}