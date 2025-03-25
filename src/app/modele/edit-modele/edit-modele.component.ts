import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { Brand } from '../../brand/brand';
import { BrandService } from '../../brand/brand.service';
import { Alert } from '../../shared/shared.service';
import { Modele } from '../modele';
import { ModeleService } from '../modele.service';

@Component({
  selector: 'app-edit-modele',
  templateUrl: './edit-modele.component.html',
  styleUrls:[ './edit-modele.component.css']
})
export class EditModeleComponent {

  modeleId!: number
  modele: Modele = new Modele()
  success: boolean = false
  modeleForm: FormGroup
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  alert: Alert = new Alert()
  brands: Brand[] = []
    loading: boolean = false

  constructor(private formBuilder: FormBuilder,  private activatedRoute: ActivatedRoute, private modeleService: ModeleService, private brandsService: BrandService) {   this.modeleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [],
      active: [],
      brandId: [, [Validators.required]],
      });

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params:ParamMap )=> {
      this.modeleId = Number(params.get('id'));
      this.getModele()
    });
  }

  getModele() {
    this.modeleService.getModele(this.modeleId).subscribe(
      (data:any) => {
        this.modele = data
        this.modeleForm.patchValue(this.modele)
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }



  
onSearchChange(args: string) {
  this.loading = true
  let filter: any={}
  if (args) {
    filter.take = 10
      filter.where = { name: { type: "ilike", value:args }, active: true }
    
  } else {
    filter.take = 15
      filter.where = { active: true }
  }
      this.getBrands(filter)
      
  }


  
 
    getBrands(filter: any) {
    
      filter.select
       = ['id', 'name']
          this.brandsService.getBrands(filter).subscribe(
            data => {
              this.brands = data[0]
            },
            err => {
              console.error('Observer got an error: ' + err)
            },
            () => this.loading = false
          );
        }

        
  submitAction(top: HTMLElement) {
    if (this.modeleForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      if (this.modeleId) {
        this.modeleService.editModele(this.modeleId, this.modeleForm.value).subscribe(
          (data) => {
            this.modele = data;
            this.validateBtnState = ClrLoadingState.SUCCESS;
            this.alert = { success: true, msgSuccess: "La modification de modèle " + this.modele.id + " a été effectuée avec succès !", echec: false, open: true }   },
          (err) => {
            console.error('Erreur lors de la modification de la modèle:', err);
            this.alert = { success: true, msgSuccess: "La modification de modèle " + this.modele.id + " a été effectuée avec succès !", echec: false, open: true }      
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
