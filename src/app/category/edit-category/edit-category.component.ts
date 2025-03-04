import { Component } from '@angular/core';
import { Category } from '../category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProvidersService } from '../../providers/providers.service';
import { CategoryService } from '../category.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
 
  
  categoryId: number=0
    user: Category = new Category()
    success: boolean = false
    erreurMsg: string = ''
    registerForm: FormGroup
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    msgAlert: string = ''
    category!: Category
    alert: Alert = new Alert()
  
    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description : ['', [Validators.required]],
        status: [],
        active: [],
        });
  
    }
  
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.categoryId = Number(params.get('id'));
        console.log('Category ID:', this.categoryId);
        this.getCategorys();
      });
    }
    
  
    getCategorys() {
      this.categoryService.getCategory(this.categoryId).subscribe(
        (data:any) => {
          this.category = data
          this.registerForm.patchValue(this.category)
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }
    categorysId(categorysId: any) {
      throw new Error('Method not implemented.');
    }
  
    actionClose() {
      this.success = false
    }
  
   submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING
      if (this.categoryId) {
        console.log("id",this.categoryId)
          this.categoryService.editCategory(this.categoryId, this.registerForm.value).subscribe(
            data => {
              this.category = data
              this.success = true
              this.validateBtnState = ClrLoadingState.SUCCESS
              this.alert = { success: true, msgSuccess: " La modification d'categorie "   + data.id + " a été effectuée avec succès! ", echec: false, open: true }
            },
            err => {
              console.error('Observer got an error: ' + err)
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
              } else {
                this.alert = { success: false, msgEchec: "La modification d'un categorie a été échoué ..", echec: true, open: true }
              }
                this.validateBtnState = ClrLoadingState.ERROR;
            }
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
  

