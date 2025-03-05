import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { BrandService } from '../../brand/brand.service';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { Modele } from '../modele';
import { ModeleService } from '../modele.service';

@Component({
  selector: 'app-modeles',
  templateUrl: './modeles.component.html',
  styleUrl: './modeles.component.css'
})
export class ModelesComponent {
  modeles: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Modele[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentModele: number = -1;
  brands: any;
  form: any;
  fb: any;
  constructor(private modeleService: ModeleService, private router: Router, private sharedService:SharedService, private brandsService: BrandService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currentModele = +this.sharedService.getCookie('idModele')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    this.filter = Object.assign(this.filter,handleStateFilter(this.state)) 
     this.getModeles()
  }
 

  getModeles() {
    this.modeleService.getModeles(this.filter).subscribe(
      data => {
        this.modeles = data[0]
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

  existInSelected(item: Modele) {
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
    this.router.navigate(['/modeles/edit-modele/', this.allSelected[0].id]);
  }
}
