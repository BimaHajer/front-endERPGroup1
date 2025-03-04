import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategorysComponent } from './categorys/categorys.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CategorysComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,SharedModule
  ]
})
export class CategoryModule { }
