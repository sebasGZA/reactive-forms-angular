import { FormGroup } from "@angular/forms";

export class FormUtils {
    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        const field = form.controls[fieldName];
        return (!!field.errors) && field.touched
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        const field = form.controls[fieldName];
        if (!field) return null;
        const errors = field.errors ?? {}
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'This field is required'
                case 'minlength':
                    return `The name must contain ${errors['minlength'].requiredLength} or more characters`
                case 'min':
                    return `The min value is ${errors['min'].min}`
            }
        }
        return null;
    }
}