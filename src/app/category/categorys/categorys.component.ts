import { Component } from '@angular/core';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { Category } from '../category';
import { FilterDto } from '../../filter.dto';
import { handleStateFilter, pageSize, pageSizeOptions, SharedService } from '../../shared/shared.service';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrl: './categorys.component.css'
})
export class CategorysComponent {
    categorys: any[] = []
    showAlert: boolean = false;
    count: number = 0;
    loading: boolean = true
    state: ClrDatagridStateInterface = {}
  
    allSelected: Category[] = [];
    descSort: ClrDatagridSortOrder = ClrDatagridSortOrder.DESC
    idsSelected: any = [];
    filter: FilterDto = new FilterDto()
  
    pageSize = pageSize
    pageSizeOptions = pageSizeOptions
    currentCategory: number = -1;
    constructor(private categoryService: CategoryService, private router: Router, private sharedService:SharedService) {}
  
    ngOnInit() {
      this.currentCategory = +this.sharedService.getCookie('idCategory')
    }
  
   refresh(state: ClrDatagridStateInterface) {
      this.loading = true
      this.state = state
      this.filter = Object.assign(this.filter,handleStateFilter(this.state))
      this.getCategorys()
    }
  
    getCategorys() {
      this.categoryService.getCategorys(this.filter).subscribe(
        data => {
          this.categorys = data[0]
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
  
    existInSelected(item: Category) {
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
      this.router.navigate(['/category/edit-category/'+String(this.allSelected[0].id)]);
    }
  
  }
  


