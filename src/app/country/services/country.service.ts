import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Country, RESCountryResponse } from '../interfaces/REScountry.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
    private baseUrl = environment.restApiUrl;
    private apiKey = environment.restApiKey;
    private http = inject(HttpClient);

    private _regions = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
    ]

    get regions(): string[] {
        return [...this._regions]
    }

    getCountriesByRegion(region: string): Observable<Country[]> {
        if (!region) return of([])
        return this.http.get<RESCountryResponse>(`${this.baseUrl}/region/${region}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            },
            params: {
                response_fields: 'names.common,flag.emoji,borders'
            }
        }).pipe(
            map(({ data }: RESCountryResponse) => data.objects)
        )
    }

    getCountryByAlphaCode(code: string): Observable<Country | null> {
        return this.http.get<RESCountryResponse>(
            `${this.apiKey}/codes.alpha_2/${code}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            },
            params: {
                response_fields: 'names.common,flag.emoji,borders'
            }
        }).pipe(
            map(({ data }: RESCountryResponse) => data.objects[0] ?? null)
        )
    }

    getCountryBordersByCode(borders: string) {

    }
}