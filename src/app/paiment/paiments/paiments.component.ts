import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { Paiment } from '../paiment';
import { PaimentService } from '../paiment.service';

@Component({
  selector: 'app-paiments',
  templateUrl: './paiments.component.html',
  styleUrl: './paiments.component.css'
})
export class PaimentsComponent {
  paiments: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Paiment[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentPaiment: number = -1;
  form: any;
  fb: any;
  constructor(private paimentService: PaimentService, private router: Router, private sharedService:SharedService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currentPaiment = +this.sharedService.getCookie('idPaiment')
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    this.filter = Object.assign(this.filter,handleStateFilter(this.state)) 
     this.getPaiments()
  }

 

  getPaiments() {
    this.paimentService.getPaiments(this.filter).subscribe(
      data => {
        this.paiments = data[0]
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

  existInSelected(item: Paiment) {
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
    this.router.navigate(['/paiments/edit-paiment/', this.allSelected[0].id]);
  }

}
