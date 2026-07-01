import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.util';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder)
  formUtils = FormUtils;

  myForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(this.formUtils.namePattern),
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.formUtils.notOnlySpacesPattern)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(this.formUtils.emailPattern),
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ]
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
  }, {
    validators: [
      this.formUtils.areFieldsEquals('password', 'confirmPassword')
    ]
  })



  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
