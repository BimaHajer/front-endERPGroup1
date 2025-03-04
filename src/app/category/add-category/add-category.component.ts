import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ProvidersService } from '../../providers/providers.service';
import { CategoryService } from '../category.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
 
   
      validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
      success: boolean = false;
      erreurMsg: string = '';
      msgAlert: string = '';
      registerForm: FormGroup;
      alert: Alert = new Alert()
      constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
      ) {
        this.registerForm = this.formBuilder.group(
          {
          
            name: ['', [Validators.required]],
            description: ['',[Validators.required]],
            status: [true],
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
          this.categoryService.addCategory(this.registerForm.value).subscribe(
            (data) => {
  
              console.log("category",data)
              this.validateBtnState = ClrLoadingState.SUCCESS;
              this.registerForm.reset({ active: true });
              this.alert = { success: true, msgSuccess: "L'ajout d'categorie " + data.id + " a été effectué avec succès! ", echec: false, open: true }
            },
            (err) => {
              console.error('Observer got an error: ' + err);
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
              } else {
                this.alert = { success: false, msgEchec: "L'ajout d'un fournisseur a été échoué ..", echec: true, open: true }
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
