import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent { 
  brands: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Brand[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentBrand: number = -1;
  constructor(private brandService: BrandService, private router: Router, private sharedService:SharedService) {}

  ngOnInit() {
    this.currentBrand = +this.sharedService.getCookie('idBrand')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    this.filter = Object.assign(this.filter,handleStateFilter(this.state)) 
    this.getBrands()
  }
 

  getBrands() {
    this.brandService.getBrands(this.filter).subscribe(
      data => {
        this.brands = data[0]
        this.count = data[1]
      },
      err => console.error('Observer got an error: ' + err),
      () => {
        this.loading = false
      }
    )
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

  existInSelected(item: Brand) {
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
    this.router.navigate(['/brands/edit-brand/', this.allSelected[0].id]);
  }
}
