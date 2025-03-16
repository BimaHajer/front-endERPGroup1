import { Component } from '@angular/core';
import { Providers } from '../providers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProvidersService } from '../providers.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

providersId: number=0
  user: Providers = new Providers()
  success: boolean = false
  erreurMsg: string = ''
  registerForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  msgAlert: string = ''
  providers!: Providers
   alert: Alert = new Alert()


  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private providersService: ProvidersService) {
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
      this.providersId = Number(params.get('id'));
      this.getProviders()
    });
  }

  getProviders() {
    this.providersService.getProvider(this.providersId).subscribe(
      (data:any) => {
        this.user = data
        this.registerForm.patchValue(this.user)
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }
  providerssId(providerssId: any) {
    throw new Error('Method not implemented.');
  }

  actionClose() {
    this.success = false
  }

 submitAction(top: HTMLElement) {
  if (this.registerForm.valid) {
    this.validateBtnState = ClrLoadingState.LOADING
    if (this.providersId) {
        this.providersService.editProviders(this.providersId, this.registerForm.value).subscribe(
          data => {
            this.providers = data
            this.success = true
            this.validateBtnState = ClrLoadingState.SUCCESS
            this.alert = { success: true, msgSuccess: " La modification d'fournisseur "   + data.id + " a été effectué avec succès! ", echec: false, open: true }
          },
          err => {
            console.error('Observer got an error: ' + err)
            if (/e-mail existe déjà/.test(err.error.message)) {
              this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
            } else {
              this.alert = { success: false, msgEchec: "La modification d'un fournisseur a été échoué ..", echec: true, open: true }
            }
              this.validateBtnState = ClrLoadingState.ERROR;
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

