import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getAllProducts: any;
  constructor(private http: HttpClient) { }

  getProducts(filter: FilterDto<Product>): Observable<[Product[], number]> {
    return this.http.get(environment.api + '/products?filter=' + JSON.stringify(filter)) as Observable<[Product[], number]>;
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.api + '/products', product);
  }

  editProduct(ID: number, productObject: Product): Observable<Product> {
    return this.http.patch<Product>(environment.api + '/products/' + JSON.stringify(ID), productObject);
  }
  getProduct(ID: number): Observable<Product> {
    return this.http.get(environment.api + '/products/' + JSON.stringify(ID)) as Observable<Product>;
  }
  
  
  deleteProduct(ID: number): Observable<Product> {
    return this.http.delete(environment.api + '/products/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Product>(environment.api + '/products/deleteMultipleProduct', [toDelete, toDisable]);
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


