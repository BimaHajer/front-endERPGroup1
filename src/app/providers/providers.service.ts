import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';
import { Providers } from './providers';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {


  constructor(private http: HttpClient) { }

  getProviders(filter: FilterDto<Providers>): Observable<[Providers[], number]> {
    return this.http.get(environment.api + '/providers?filter=' + JSON.stringify(filter)) as Observable<[Providers[], number]>;
  }

  addProviders(Providers:Providers): Observable<Providers> {
    return this.http.post<Providers>(environment.api + '/providers', Providers);
  }

  editProviders(ID: number, providersObject: Providers): Observable<Providers> {
    console.log("id",ID)
    return this.http.patch<Providers>(environment.api + '/providers/'+JSON.stringify(ID), providersObject);
  }

  getProvider(ID: number): Observable<Providers> {
    return this.http.get(environment.api + '/providers/' +JSON.stringify(ID)) as Observable<Providers>;
  }

  deleteProviders(ID: number): Observable<Providers> {
    return this.http.delete(environment.api + '/providers/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Providers>(environment.api + '/providers/deleteMultipleProviders', [toDelete, toDisable]);
  }

}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl:any = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
