import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { BrandService } from '../../brand/brand.service';
import { CategoryService } from '../../category/category.service';
import { FilterDto } from '../../filter.dto';
import { ModeleService } from '../../modele/modele.service';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Product[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentProduct: number = -1;
  brands: any;
  categorys: any;
  modeles: any;
  form: any;
  fb: any;
  constructor(private productService: ProductService, private router: Router, private sharedService:SharedService, private brandsService: BrandService,private categorysService: CategoryService,private modelesService: ModeleService ,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currentProduct = +this.sharedService.getCookie('idProduct')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    this.filter = Object.assign(this.filter,handleStateFilter(this.state)) 
     this.filter.relations=['categoryId','modelId','modelId.brandId']
    this.getProducts()
  }
 

  getProducts() {
    this.productService.getProducts(this.filter).subscribe(
      data => {  
        this.products = data[0]; 
        this.count = data[1];     
      },
      err => console.error('Erreur lors de la récupération des produits:', err),
      () => {
        this.loading = false;      }
    );
  }
  

  close() {
    this.showAlert = false;
    this.allSelected = []
  }

  save() {
    this.showAlert = false;
    this.allSelected = []
    this.refresh(this.state)
  }

  existInSelected(item: Product) {
    return this.allSelected.findIndex(elem => elem.id == item.id) >= 0
  }

  selectionChanged() {
    this.allSelected = this.allSelected.reverse()
      .filter((item, index, self) => index === self.findIndex((tab) => (tab.id === item.id)))
      this.idsSelected = this.allSelected.map(elem => elem.id)
    }

  deleteMultipleAction() {
    this.idsSelected = this.allSelected.map(elem => elem.id)
    this.showAlert = true
  }

  editAction() {
    this.router.navigate(['/products/edit-product/', this.allSelected[0].id]);
  }
}
