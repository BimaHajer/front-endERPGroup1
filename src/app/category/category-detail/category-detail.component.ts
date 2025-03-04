import { Component } from '@angular/core';
import { Category } from '../category';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {


      category = new Category()
      showAlert: boolean = false;
      categoryId: number = -1;
      currentCategory: number = -1
        
     
      constructor(private activatedRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService, private sharedService: SharedService) { }
    
      ngOnInit(): void {
        this.currentCategory = +this.sharedService.getCookie('idCategory')
    
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
          this.categoryId = Number(params.get('id'))
          this.getCategory()
    
        })
      }
    
      getCategory() {
        this.categoryService.getCategory(this.categoryId).subscribe(
          (data:any) => {
            this.category = data
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
        this.router.navigate(['../../category']);
        this.showAlert = false;
      }
    
      redirectTo() {
       window.history.back();
      }
    }
  
  

