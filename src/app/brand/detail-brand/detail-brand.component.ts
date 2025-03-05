import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-detail-brand',
  templateUrl: './detail-brand.component.html',
  styleUrl: './detail-brand.component.css'
})
export class DetailBrandComponent { 
  @Input() allSelected: any;

  brand = new Brand()
  // brandAdd = new Brand()
  // BrandEdit = new Brand()
  showAlert: boolean = false;
  brandId: number = -1;
  currentBrand: number = -1
  // disable: boolean = false;
  // created: string = ''
  // updated: string = ''
  // src: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private brandService: BrandService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentBrand = +this.sharedService.getCookie('idBrand')

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.brandId = Number(params.get('id'))
      this.getBrand()

    })
  }

  getBrand() {
    this.brandService.getBrand(this.brandId).subscribe(
      (data:any) => {
        this.brand = data
      },
      err => { console.error('Observer got an error: ' + err) },
    )
  }

  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../brands']);
    this.showAlert = false;
  }

  redirectTo() {
   window.history.back();
  }
}
