import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Alert } from '../../shared/shared.service';
import { PaimentService } from '../paiment.service';

@Component({
  selector: 'app-add-paiment',
  templateUrl: './add-paiment.component.html',
  styleUrl: './add-paiment.component.css'
})
export class AddPaimentComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  erreurMsg: string = '';
  alert: Alert = new Alert()
  loading: boolean = false

  paimentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private paimentService: PaimentService,
  ) {

    this.paimentForm= this.formBuilder.group(
      {
        modPayment: [, [Validators.required]],
        description: [],
        active: [true]
      },
    );
  }

  ngOnInit() {}

  submitAction(top: HTMLElement) {
    if (this.paimentForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.paimentService.addPaiment(this.paimentForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.paimentForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout de mode de paiment " + data.id + " a été effectué avec succès! ", echec: false, open: true }
        },
        (err) => {
          console.error('Observer got an error: ' + err);

            this.alert = { success: false, msgEchec: "L'ajout du mode due paiment été échoué ..", echec: true, open: true }
          this.validateBtnState = ClrLoadingState.ERROR;
        }
      );
    }
    this.scroll(top);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  redirectTo() {
    window.history.back();
  }

}
