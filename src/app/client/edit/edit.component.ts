import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { Alert } from '../../shared/shared.service';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent  {
 clientId!: number
  client: Client = new Client()
  registerForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  loading: boolean = false
  alert: Alert = new Alert()

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private clientService: ClientService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: [],
      zipCode: [, Validators.maxLength(5)],
      active: [],
      });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
      this.clientId = Number(params.get('id'));
      this.getClient()
    });
  }

  getClient() {
    this.clientService.getClient(this.clientId).subscribe(
      (data:any) => {
        this.client = data
        this.registerForm.patchValue(this.client)
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }

  submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING
      if (this.clientId) {
          this.clientService.editClient(this.clientId, this.registerForm.value).subscribe(
            data => {
              this.client = data
              this.validateBtnState = ClrLoadingState.SUCCESS
              this.alert = { success: true, msgSuccess: "La modification de client " + this.client.id + " a été effectuée avec succès !", echec: false, open: true }
            },
            err => {
              console.error('Observer got an error: ' + err)
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
              } else {
                this.alert = { success: false, msgEchec: "La modification de client a été échouée ..", echec: true, open: true }
              }
              this.validateBtnState = ClrLoadingState.ERROR
            },
          )
      }
    }
    this.scroll(top)
  }
  

scroll(el: HTMLElement) {
  el.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

redirectTo() {
  window.history.back()
}

}
