import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorysComponent } from './categorys/categorys.component';
import { AuthGuard } from '../auth/auth.guard';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategorysComponent,canActivate: [AuthGuard]},
      { path: 'edit-category/:id', component: EditCategoryComponent,canActivate: [AuthGuard]},
      { path: 'add-category', component: AddCategoryComponent,canActivate: [AuthGuard]},
      { path: 'delete-category', component: DeleteCategoryComponent,canActivate: [AuthGuard]},
      { path: 'category-detail/:id', component: CategoryDetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
