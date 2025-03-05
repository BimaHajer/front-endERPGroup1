import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterDto } from '../filter.dto';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 
  constructor(private http: HttpClient) { }

  getClients(filter: FilterDto<Client>): Observable<[Client[], number]> {
    return this.http.get(environment.api + '/clients?filter=' + JSON.stringify(filter)) as Observable<[Client[], number]>;
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.api + '/clients', client);
  }

  editClient(ID: number, clientObject: Client): Observable<Client> {
    return this.http.patch<Client>(environment.api + '/clients/' + JSON.stringify(ID), clientObject);
  }

  getClient(ID: number): Observable<Client> {
    return this.http.get(environment.api + '/clients/' + JSON.stringify(ID)) as Observable<Client>;
  }

  deleteClient(ID: number): Observable<Client> {
    return this.http.delete(environment.api + '/clients/' + JSON.stringify(ID));
  }

  deleteMultiple(toDelete: number[], toDisable: number[]): Observable<any> {
    return this.http.post<Client>(environment.api + '/clients/deleteMultipleClient', [toDelete, toDisable]);
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
