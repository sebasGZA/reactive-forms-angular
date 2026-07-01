import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

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
  borders = signal<string[]>([])

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })

  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();

    onCleanUp(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  })

  onRegionChange() {
    return this.myForm.get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('borders')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([])
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe((countries) => this.countriesByRegion.set(countries))
  }

  onCountryChange() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('borders')!.setValue('')),
        filter(value => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode!)
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByBorders(country.borders)
        )
      )
      .subscribe((countries) => console.log(countries))
  }
}
