import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form.util';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder)
  formUtil = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ],
      Validators.minLength(3)
    ),
  });

  newFavoriteGame: FormControl = new FormControl('', Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray
  }

  onAddToFavorites() {
    if (this.newFavoriteGame.invalid) return;
    const favorite = this.newFavoriteGame.value;
    this.favoriteGames.push(this.fb.control(favorite, Validators.required))
    this.newFavoriteGame.reset()
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index)
  }

  onSubmit(){
    this.myForm.markAllAsTouched()
  }
}
