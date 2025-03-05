import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Alert, SharedService } from '../../shared/shared.service';
import { ClientService } from '../client.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  registerForm: FormGroup;
  loading: boolean = true
  loadingImg: boolean = false
  alert: Alert = new Alert()

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private sharedService: SharedService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['',[ Validators.required, Validators.email]],
        phone: ['',[Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: [],
        zipCode: [, Validators.maxLength(5)],
        active: [true],
      },
    );
  }

  ngOnInit() {}


  submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.clientService.addClient(this.registerForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.registerForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout du client " + data.id + " a été effectué avec succès! ", echec: false, open: true }
        },
        (err) => {
          console.error('Observer got an error: ' + err);
          if (/e-mail existe déjà/.test(err.error.message)) {
            this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
          } else {
            this.alert = { success: false, msgEchec: "L'ajout de client a été échoué ..", echec: true, open: true }
          }
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
