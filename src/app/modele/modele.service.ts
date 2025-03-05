import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';
import { Modele } from './modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  
  constructor(private http: HttpClient) { }

  getModeles(filter: FilterDto<Modele>): Observable<[Modele[], number]> {
    return this.http.get(environment.api + '/modeles?filter=' + JSON.stringify(filter)) as Observable<[Modele[], number]>;
  }

  addModele(modele: Modele): Observable<Modele> {
    return this.http.post<Modele>(environment.api + '/Modeles', modele);
  }

  editModele(ID: number, modeleObject: Modele): Observable<Modele> {
    return this.http.patch<Modele>(environment.api + '/modeles/' + JSON.stringify(ID), modeleObject);
  }
  getModele(ID: number): Observable<Modele> {
    return this.http.get(environment.api + '/modeles/' + JSON.stringify(ID)) as Observable<Modele>;
  }
  
  deleteModele(ID: number): Observable<Modele> {
    return this.http.delete(environment.api + '/modeles/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Modele>(environment.api + '/modeles/deleteMultipleModele', [toDelete, toDisable]);
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

