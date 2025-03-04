import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { TvaService } from '../tva.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-add-tva',
  templateUrl: './add-tva.component.html',
  styleUrl: './add-tva.component.css'
})
export class AddTvaComponent {

   
      validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
      success: boolean = false;
      erreurMsg: string = '';
      msgAlert: string = '';
      registerForm: FormGroup;
      alert: Alert = new Alert()
      constructor(
        private formBuilder: FormBuilder,
        private userService: TvaService,
      ) {
        this.registerForm = this.formBuilder.group(
          {
            value: [,[ Validators.required]],
            
            active: [true],
          },
          
        );
      }
    
      ngOnInit() {}
    
    
      close() {
        this.success = false;
      }
    
    
      submitAction(top: HTMLElement) {
        if (this.registerForm.valid) {
          this.validateBtnState = ClrLoadingState.LOADING;
          this.userService.addTva(this.registerForm.value).subscribe(
            (data) => {
  
              console.log("user",data)
              this.validateBtnState = ClrLoadingState.SUCCESS;
              this.registerForm.reset({ active: true });
              this.alert = { success: true, msgSuccess: "L'ajout de tva " + data.id + " a été effectuée avec succès! ", echec: false, open: true }
            },
            (err) => {
              console.error('Observer got an error: ' + err);
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
               } else {
                this.alert = { success: false, msgEchec: "L'ajout de tva a été échouée ..", echec: true, open: true }
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
    
  

