import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/REScountry.interface';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb: FormBuilder = inject(FormBuilder)

  countryService = inject(CountryService)
  
  regions = signal<string[]>(this.countryService.regions);
  countriesByRegion = signal<Country[]>([])
  bordersByCountry = signal<string[]>([])

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })
}
