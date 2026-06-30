import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   stock: new FormControl(0),
  // })
  fb = inject(FormBuilder)
  myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ],
      []
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.min(10)
      ]
    ],
    stock: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],
  })

  isValidField(fieldName: string): boolean | null {
    const field = this.myForm.controls[fieldName];
    return (!!field.errors) && field.touched
  }

  getFieldError(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;
    const errors = this.myForm.controls[fieldName].errors ?? {}
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

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    console.log(this.myForm.value)
    this.myForm.reset()
  }
}
