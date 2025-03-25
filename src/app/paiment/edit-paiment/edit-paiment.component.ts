import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { Alert } from '../../shared/shared.service';
import { Paiment } from '../paiment';
import { PaimentService } from '../paiment.service';

@Component({
  selector: 'app-edit-paiment',
  templateUrl: './edit-paiment.component.html',
  styleUrl: './edit-paiment.component.css'
})
export class EditPaimentComponent {

  paimentId!: number
  paiment: Paiment = new Paiment()
  success: boolean = false
  paimentForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  alert: Alert = new Alert()
  loading: boolean = false

  constructor(private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute, private paimentService: PaimentService) {
       this.paimentForm = this.formBuilder.group({
        modPayment: [, [Validators.required]],
      description: [],
      active: [],
      });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
      this.paimentId = Number(params.get('id'));
      this.getPaiment()
    });
  }

  getPaiment() {
    this.paimentService.getPaiment(this.paimentId).subscribe(
      (data:any) => {
        this.paiment = data
        this.paimentForm.patchValue(this.paiment)
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }
        
  submitAction(top: HTMLElement) {
    if (this.paimentForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      if (this.paimentId) {
        this.paimentService.editPaiment(this.paimentId, this.paimentForm.value).subscribe(
          (data) => {
            this.paiment = data;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de mode de paiement " + this.paiment.id + " a été effectuée avec succès !", echec: false, open: true }   
            },
          (err) => {
            console.error('Erreur lors de la modification de la mode de paiement:', err);
            this.alert = { success: true, msgSuccess: "La modification de mode de paiment " + this.paiment.id + " a été effectuée avec succès !", echec: false, open: true }      
                  this.validateBtnState = ClrLoadingState.ERROR;
          }
        );
      }
    }
    this.scroll(top);
  }

scroll(el: HTMLElement) {
  el.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

redirectTo() {
  window.history.back()
}
}
