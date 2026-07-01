import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';

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
                response_fields: 'names.common,flag.emoji,borders,codes.alpha_2'
            }
        }).pipe(
            map(({ data }: RESCountryResponse) => data.objects)
        )
    }

    getCountryByAlphaCode(code: string): Observable<Country> {
        return this.http.get<RESCountryResponse>(
            `${this.baseUrl}/codes.alpha_2/${code}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            },
            params: {
                response_fields: 'names.common,flag.emoji,borders,codes.alpha_2'
            }
        }).pipe(
            map(({ data }: RESCountryResponse) => data.objects[0])
        )
    }

    getCountryByBorder(border: string) {
        return this.http.get<RESCountryResponse>(
            `${this.baseUrl}/codes.alpha_3/${border}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            },
            params: {
                response_fields: 'names.common,flag.emoji,borders,codes.alpha_2'
            }
        }).pipe(
            map(({ data }: RESCountryResponse) => data.objects[0])
        )
    }

    getCountryNamesByBorders(countryCodes: string[]): Observable<Country[]> {
        if (!countryCodes || countryCodes.length === 0) return of([])
        const countryRequests: Observable<Country>[] = [];
        countryCodes.forEach((border) => {
            const request = this.getCountryByBorder(border);
            countryRequests.push(request)
        })
        return combineLatest(countryRequests)
    }
}