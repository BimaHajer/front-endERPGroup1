import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterDto } from '../filter.dto';
import { Tva } from './tva';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TvaService {
  constructor(private http: HttpClient) { }

  getTvas(filter: FilterDto<Tva>): Observable<[Tva[], number]> {
    return this.http.get(environment.api + '/tva?filter=' + JSON.stringify(filter)) as Observable<[Tva[], number]>;
  }

  addTva(Tva:Tva): Observable<Tva> {
    return this.http.post<Tva>(environment.api + '/tva', Tva);
  }

  editTva(ID: number, tvaObject: Tva): Observable<Tva> {
  
    return this.http.patch<Tva>(environment.api + '/tva/'+JSON.stringify(ID), tvaObject);
  }

  getTva(ID: number): Observable<Tva> {
    return this.http.get(environment.api + '/tva/' +JSON.stringify(ID)) as Observable<Tva>;
  }

  deleteTva(ID: number): Observable<Tva> {
    return this.http.delete(environment.api + '/tva/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Tva>(environment.api + '/tva/deleteMultipleTva', [toDelete, toDisable]);
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
