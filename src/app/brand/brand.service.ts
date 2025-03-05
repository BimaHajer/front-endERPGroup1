import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

    constructor(private http: HttpClient) { }

  getBrands(filter: FilterDto<Brand>): Observable<[Brand[], number]> {
    return this.http.get(environment.api + '/brands?filter=' + JSON.stringify(filter)) as Observable<[Brand[], number]>;
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(environment.api + '/Brands', brand);
  }

  editBrand(ID: number, brandObject: Brand): Observable<Brand> {
    return this.http.patch<Brand>(environment.api + '/brands/' + JSON.stringify(ID), brandObject);
  }
  getBrand(ID: number): Observable<Brand> {
    return this.http.get(environment.api + '/brands/' + JSON.stringify(ID)) as Observable<Brand>;
  }
  
  deleteBrand(ID: number): Observable<Brand> {
    return this.http.delete(environment.api + '/brands/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Brand>(environment.api + '/brands/deleteMultipleBrand', [toDelete, toDisable]);
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
