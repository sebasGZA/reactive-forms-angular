import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  Validators, 
  FormGroup,
} from '@angular/forms'
import { FormUtils } from '../../../utils/form.util';

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
  private fb = inject(FormBuilder)
  formUtils = FormUtils;

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

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }
    console.log(this.myForm.value)
    this.myForm.reset()
  }
}
