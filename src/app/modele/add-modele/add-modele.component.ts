import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Brand } from '../../brand/brand';
import { BrandService } from '../../brand/brand.service';
import { Alert } from '../../shared/shared.service';
import { ModeleService } from '../modele.service';

@Component({
  selector: 'app-add-modele',
  templateUrl: './add-modele.component.html',
  styleUrl: './add-modele.component.css'
})
export class AddModeleComponent {
  
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  erreurMsg: string = '';
  alert: Alert = new Alert()
  brands: Brand[] = []
    loading: boolean = false 
    
  modeleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modeleService: ModeleService,
    private brandsService: BrandService
  ) {

    this.modeleForm= this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        active: [true],
        brandId: [, [Validators.required]],
      },
    );
  }

  ngOnInit() {}



  onSearchChange(args: string) {
    this.loading = true
    let filter: any={}
    if (args) {
      filter.take = 10
        filter.where = { name: { type: "ilike", value: args  }, active: true }
      
    } else {
      filter.take = 15
        filter.where = { active: true }
    }
        this.getBrands(filter)
        
    }
  
 
    getBrands(filter: any) {
      console.log("Filtre utilisé pour la recherche des marques :", filter);
      filter.select = ['id', 'name'];
  
      this.brandsService.getBrands(filter).subscribe(
          data => {
              console.log("Données reçues :", data);
              this.brands = data[0]; 
          },
          err => {
              console.error('Erreur lors de la récupération des marques:', err);
          },
          () => this.loading = false
      );
  }

        
  submitAction(top: HTMLElement) {
    if (this.modeleForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.modeleService.addModele(this.modeleForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.modeleForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout de modele " + data.id + " a été effectué avec succès! ", echec: false, open: true }
        },
        (err) => {
          console.error('Observer got an error: ' + err);
          
            this.alert = { success: false, msgEchec: "L'ajout du modele été échoué ..", echec: true, open: true }
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
