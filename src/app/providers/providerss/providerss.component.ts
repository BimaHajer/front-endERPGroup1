import { Component } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { Router } from '@angular/router';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { FilterDto } from '../../filter.dto';
import { Providers } from '../providers';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-providerss',
  templateUrl: './providerss.component.html',
  styleUrl: './providerss.component.css'
})
export class ProviderssComponent {
  providerss: any[] = []
  showAlert: boolean = false;
  count: number = 0;
  loading: boolean = true
  state: ClrDatagridStateInterface = {}

  allSelected: Providers[] = [];
  descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
  idsSelected: any = [];
  filter: FilterDto = new FilterDto()

  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  currentUser: number = -1;
  constructor(private providersService: ProvidersService, private router: Router, private sharedService:SharedService) {}

  ngOnInit() {
    this.currentUser = +this.sharedService.getCookie('idProviders')
  }

 refresh(state: ClrDatagridStateInterface) {
    this.loading = true
    this.state = state
    this.filter = Object.assign(this.filter,handleStateFilter(this.state))
    this.getProviders()
  }

  getProviders() {
    this.providersService.getProviders(this.filter).subscribe(
      data => {
        this.providerss = data[0]
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
  }

  save() {
    this.showAlert = false;
    this.allSelected = []
    this.refresh(this.state)
  }

  existInSelected(item: Providers) {
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
    this.router.navigate(['/providers/edit/', this.allSelected[0].id]);
  }

}
