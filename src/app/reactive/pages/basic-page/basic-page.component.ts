import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
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
  myForm = this.fb.group({
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
}
