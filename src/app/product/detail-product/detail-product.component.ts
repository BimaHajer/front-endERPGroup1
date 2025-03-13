import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Brand } from '../../brand/brand';
import { Category } from '../../category/category';
import { Modele } from '../../modele/modele';
import { SharedService } from '../../shared/shared.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  @Input() allSelected: any[] = [];  
  product = new Product();
  showAlert: boolean = false;
  productId: number = -1;
  currentProduct: number = -1;
  brands: Brand[] = [];
  categorys: Category[] = [];
  modeles: Modele[] = [];
  loading: boolean = true;
  form: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {

    this.currentProduct = +this.sharedService.getCookie('idProduct');

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.productId = Number(params.get('id'));
      this.getProduct();
    });
  }

  getProduct() {
    this.productService.getProduct(this.productId).subscribe(
      (data: any) => {
        this.product = data;
      },
      err => {
        console.error('Erreur lors de la récupération du modèle: ' + err);
      }
    );
  }

 
  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../products']);
    this.showAlert = false;
  }

  redirectTo() {
    window.history.back();
  }
}
