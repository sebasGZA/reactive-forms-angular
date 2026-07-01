import {
    AbstractControl,
    FormArray,
    FormGroup,
    ValidationErrors,
} from "@angular/forms";

async function sleep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 2500);
    })
}

export class FormUtils {

    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
                case 'emailTaken':
                    return 'The email is already used';
                case 'pattern':
                    if (errors['pattern'].requiredPattern === this.emailPattern) {
                        return 'The email is not valid email'
                    }
                    return 'Pattern error is not handled'
                default:
                    return `Error is not handled for ${key}`
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

    static areFieldsEquals(field1: string, field2: string) {
        return (formGroup: AbstractControl) => {
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;
            return fieldValue1 === fieldValue2 ? null : {
                fieldsAreNotEqual: true
            }
        }
    }

    static async checkingServerResponse(control: AbstractControl)
        : Promise<ValidationErrors | null> {
            await sleep()
            const formValue = control.value
            if(formValue === 'hello@world.com'){
                return {
                    emailTaken: true,
                }
            }
        return null
    }
}