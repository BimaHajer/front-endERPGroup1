import { Component } from '@angular/core';
import { Tva } from '../tva';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { TvaService } from '../tva.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-edit-tva',
  templateUrl: './edit-tva.component.html',
  styleUrl: './edit-tva.component.css'
})
export class EditTvaComponent {
  
    tvaId: number=0
    user: Tva = new Tva()
    success: boolean = false
    erreurMsg: string = ''
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    msgAlert: string = ''
    tva!: Tva
    alert: Alert = new Alert()
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private tvaService: TvaService) {
      this.registerForm = this.formBuilder.group({
        value: [, [Validators.required]],
        active: [true],
        });
  
    }
  
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
        this.tvaId = Number(params.get('id'));
        this.getTva()
      });
    }
  
    getTva() {
      this.tvaService.getTva(this.tvaId).subscribe(
        (data:any) => {
          this.tva = data
          this.registerForm.patchValue(this.tva)
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }
   
    actionClose() {
      this.success = false
    }
  
   submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING
      if (this.tvaId) {
        console.log("id",this.tvaId)
          this.tvaService.editTva(this.tvaId, this.registerForm.value).subscribe(
            data => {
              this.tva = data
              this.success = true
              this.validateBtnState = ClrLoadingState.SUCCESS
              this.alert = { success: true, msgSuccess: " La modification de tva  "   + data.id + " a été effectuée avec succès! ", echec: false, open: true }
            },
            err => {
              console.error('Observer got an error: ' + err)
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
              } else {
                this.alert = { success: false, msgEchec: "La modification de l'tva a été échouée ..", echec: true, open: true }
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

