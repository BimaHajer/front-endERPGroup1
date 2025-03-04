import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category';
import { FilterDto } from '../filter.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    
      constructor(private http: HttpClient) { }
    
      getCategorys(filter: FilterDto<Category>): Observable<[Category[], number]> {
        return this.http.get(environment.api + '/categorys?filter=' + JSON.stringify(filter)) as Observable<[Category[], number]>;
      }
    
      addCategory(Category:Category): Observable<Category> {
        return this.http.post<Category>(environment.api + '/categorys', Category);
      }
    
      editCategory(ID: number, categoryObject: Category): Observable<Category> {
        console.log("id",ID)
        return this.http.patch<Category>(environment.api + '/categorys/'+JSON.stringify(ID), categoryObject);
      }
    
      getCategory(ID: number): Observable<Category> {
        return this.http.get(environment.api + '/categorys/' +JSON.stringify(ID)) as Observable<Category>;
      }
    
      deleteCategory(ID: number): Observable<Category> {
        return this.http.delete(environment.api + '/categorys/' + JSON.stringify(ID));
      }
    
      deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
        return this.http.post<Category>(environment.api + '/categorys/deleteMultipleCategory', [toDelete, toDisable]);
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
    
   

