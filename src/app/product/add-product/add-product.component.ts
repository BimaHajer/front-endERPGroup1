import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { __values } from 'tslib';
import { Brand } from '../../brand/brand';
import { BrandService } from '../../brand/brand.service';
import { Category } from '../../category/category';
import { CategoryService } from '../../category/category.service';
import { Modele } from '../../modele/modele';
import { ModeleService } from '../../modele/modele.service';
import { Alert } from '../../shared/shared.service';
import { UploadImageComponent } from '../../shared/upload-image/upload-image.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @ViewChild(UploadImageComponent) uploadImageComponent!: UploadImageComponent;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  productForm: FormGroup;
  loading: boolean = false;
  success: boolean = false;
  erreurMsg: string = '';
  alert: Alert = new Alert();
  brands: Brand[] = []
  models: Modele[] = []
  categorys: Category[] = []
  brandId: number | null = null;
   brandAlert: Alert = new Alert();
   tvaAlert: Alert = new Alert();


  

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private brandsService: BrandService,
    private categorysService: CategoryService,
    private modelesService: ModeleService
  ) {
      this.productForm = this.formBuilder.group({
        general: this.formBuilder.group({
      name: [, [Validators.required]],
      description: [],
      active: [true], }),

      detail: this.formBuilder.group({
      categoryId: [, [Validators.required]],
      brandId: [, [Validators.required]],
      modelId: [, [Validators.required]],
    }),
    tarif: this.formBuilder.group({
      tva: [, [Validators.required]], 
      priceHT: [0.00, [Validators.pattern((/^\d*[\.,\,]?\d{0,2}$/)), Validators.max(9999999999.99)]],
      priceTTC: [0.00, [Validators.pattern((/^\d*[\.,\,]?\d{0,2}$/)), Validators.max(9999999999.99)]],
      initialQuantity: ['', [Validators.required]],
      remainingQuantity: ['', [Validators.required]] }),
    });
    
  }
  
  
  ngOnInit() {
    this.productForm.get('tarif.tva')?.valueChanges.subscribe(value => {
      if (value === null || value === undefined || value === '') {
        this.productForm.get('tarif.priceHT')?.setValue(null, { emitEvent: false });
        this.productForm.get('tarif.priceTTC')?.setValue(null, { emitEvent: false });
      }
    });
    this.productForm.get('tarif.priceHT')?.valueChanges.subscribe(value => {
      const tva = this.productForm.get('tarif.tva')?.value;
      if (value && (!tva || tva === '')) {
        this.tvaAlert = {
          success: false,
          msgEchec: 'Veuillez remplir la TVA.',
          echec: true,
          open: true
        };
      } else {
        this.tvaAlert.open = false;
      }
    });
  
   
    this.productForm.get('tarif.tva')?.valueChanges.subscribe(value => {
      if (value !== null && value !== undefined && value !== '') {
        this.tvaAlert.open = false;
      }
  
    });

    this.productForm.get('tarif.priceHT')?.valueChanges.subscribe(value => {
      const taxRate = this.productForm.get('tarif.tva')?.value || 0;
      if (taxRate && value !== null && value !== undefined) {
        const priceTTC = (value * (1 + taxRate / 100)).toFixed(2);
        this.productForm.get('tarif.priceTTC')?.setValue(priceTTC, { emitEvent: false });
      }
    });

    this.productForm.get('tarif.priceTTC')?.valueChanges.subscribe(value => {
      const taxRate = this.productForm.get('tarif.tva')?.value || 0;
      if (taxRate && value !== null && value !== undefined) {
        const priceHT = (value / (1 + taxRate / 100)).toFixed(2);
        this.productForm.get('tarif.priceHT')?.setValue(priceHT, { emitEvent: false });
      }
    });
  
   
  this.productForm.get('detail.brandId')?.valueChanges.subscribe(value => {
    if (!value) {
      this.brandAlert = {
        success: false,
        msgEchec: 'La marque doit être sélectionnée avant de continuer.',
        echec: true,
        open: true
      };
 
      this.productForm.get('detail.modelId')?.disable();
   
    } else {
      this.brandAlert.open = false;
      this.productForm.get('detail.modelId')?.enable();
    }
  });

      this.productForm.get('tarif.initialQuantity')?.valueChanges.subscribe(value => {
        if (value !== null && value !== undefined) {
          this.productForm.get('tarif.remainingQuantity')?.setValue(value, { emitEvent: false });
        }
      });
    
     
      this.productForm.get('tarif.initialQuantity')?.valueChanges.subscribe(value => {
        if (value !== null && value !== undefined) {
          this.productForm.get('tarif.remainingQuantity')?.setValue(value, { emitEvent: false });
        }
      });
  
      this.productForm.get('tarif.priceHT')?.valueChanges.subscribe(value => {
        const taxRate = this.productForm.get('tarif.tva')?.value || 0;
        if (value !== null && value !== undefined) {
          const priceTTC = (value * (1 + taxRate / 100)).toFixed(2);
          this.productForm.get('tarif.priceTTC')?.setValue(priceTTC, { emitEvent: false });
        }
      });
  
      this.productForm.get('tarif.priceTTC')?.valueChanges.subscribe(value => {
        const taxRate = this.productForm.get('tarif.tva')?.value || 0;
        if (value !== null && value !== undefined) {
          const priceHT = (value / (1 + taxRate / 100)).toFixed(2);
          this.productForm.get('tarif.priceHT')?.setValue(priceHT, { emitEvent: false });
        }
      });
  
     
     
      this.productForm.get('tarif.priceHT')?.valueChanges.subscribe(value => {
        const taxRate = this.productForm.get('tarif.tva')?.value || 0;
        if (value !== null && value !== undefined) {
          const priceTTC = (value * (1 + taxRate / 100)).toFixed(2);
          this.productForm.get('tarif.priceTTC')?.setValue(priceTTC, { emitEvent: false });
        }
      });

      
        this.productForm.get('tarif.priceHT')?.valueChanges.subscribe(value => {
          if (value !== null && value !== undefined) {
            this.calculPriceTTCWithTax();
          }
        });
      
        this.productForm.get('tarif.priceTTC')?.valueChanges.subscribe(value => {
          if (value !== null && value !== undefined) {
            this.calculPriceHTWithTax();
          }
        });
      
      
   
  }
  calculPriceTTCWithTax() {
    const tva = this.productForm.get('tarif.tva')?.value;
  
    if (!tva) {
      this.tvaAlert = {
        success: false,
        msgEchec: 'La TVA doit être remplie avant de continuer.',
        echec: true,
        open: true
      };
      return;
    }
  
    const priceHT = this.productForm.value.tarif.priceHT || 0;
    const priceTTC = (priceHT * (1 + tva / 100)).toFixed(2);
  
    this.productForm.get('tarif')?.patchValue({ priceTTC });
    this.tvaAlert.open = false;
  }
  
  calculPriceHTWithTax() {
    const tva = this.productForm.get('tarif.tva')?.value;
  
    if (!tva) {
      this.tvaAlert = {
        success: false,
        msgEchec: 'La TVA doit être remplie avant de continuer.',
        echec: true,
        open: true
      };
      return;
    }
  
    const priceTTC = this.productForm.value.tarif.priceTTC || 0;
    const priceHT = (priceTTC / (1 + tva / 100)).toFixed(2);
  
    this.productForm.get('tarif')?.patchValue({ priceHT });
    this.tvaAlert.open = false;
  }
  checkTVAField(): boolean {
    const tvaValue = this.productForm.get('tarif.tva')?.value;
   
    return true;
  }
  
  
  
  

  checkAndFillField(field: string) {
    if (field !== 'tva' && !this.checkTVAField()) {
      return false;
    }
    return true;
  }
  
  onSearchChange(args: string, type: string) {
    this.loading = true
    let filter: any={}
    if (args) {
      filter.take = 10
        filter.where = { name: { type: "ilike", value: args  }, active: true }
      
    } else {
      filter.take = 15
        filter.where = { active: true }
    }
    if(this.productForm.get('detail.brandId')?.value){
      this.brandId =this.productForm.get('detail.brandId')?.value;
    }
    if(type === 'brands'){
      this.productForm.patchValue({
        detail:{
          modelId:''

        },
      })
    
     this.getBrands(filter);
    }else if (type === 'categorys'){
      this.getCategorys(filter);
    }else if (type === 'models'){
      this.getModeles(filter)
    }   
    }
  
 
    getBrands(filter: any) {
      
      filter.select = ['id', 'name'];
  
      this.brandsService.getBrands(filter).subscribe(
        (data: any) => {
              this.brands = data[0]; 
          },
          (err: any) => {
              console.error('Erreur lors de la récupération des marques:', err);
          },
          () => this.loading = false
      );
      
      
  }
  getModeles(filter: any) {
            
    filter.select
   = ['id', 'name'];
   filter.where = Object.assign(filter.where, {brandId :this.brandId})
    this.modelesService.getModeles(filter).subscribe(
  data => {
   this.models = data[0];
 },
 err => {
   console.error('Observer got an error: ' + err)
},
() => this.loading = false
);
}
            
            
              
             
getCategorys(filter: any) {
                
filter.select= ['id', 'name']
 this.categorysService.getCategorys(filter).subscribe(
  data => {
    this.categorys = data[0]
     },
     err => {
  console.error('Observer got an error: ' + err)
  },
 () => this.loading = false
 );
  }

  submitAction(top: HTMLElement) {
    const tva = this.productForm.get('tarif.tva')?.value;

    if (!tva) {
      this.alert = {
        success: false,
        msgEchec: 'La TVA doit être remplie avant de continuer.',
        echec: true,
        open: true
      };
      return;
    }

    let product={
      name: this.productForm.value.general.name,
      description: this.productForm.value.general.description, 
      active: this.productForm.value.general.active,
      brandId: this.productForm.value.detail.brandId, 
      categoryId: this.productForm.value.detail.categoryId,
      modelId: this.productForm.value.detail.modelId, 
      priceTTC: this.productForm.value.tarif.priceTTC, 
      tva: this.productForm.value.tarif.tva, 
      priceHT: this.productForm.value.tarif.priceHT, 
      initialQuantity: this.productForm.value.tarif.initialQuantity, 
      remainingQuantity: this.productForm.value.tarif.remainingQuantity 
     }

    if (this.productForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.productService.addProduct(product).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.productForm.reset({ active: true });
          this.alert = { success: true, msgSuccess: "L'ajout de produit " + data.id + " a été effectué avec succès! ", echec: false, open: true }
        },
        (err) => {
          this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true };
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
