import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandsComponent } from './brands/brands.component';
import { DeleteBrandComponent } from './delete-brand/delete-brand.component';
import { DetailBrandComponent } from './detail-brand/detail-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';


const routes: Routes = [
  { path: '', component: BrandsComponent,canActivate: [AuthGuard]},
  { path: 'edit-brand/:id', component: EditBrandComponent, canActivate: [AuthGuard] },
  { path: 'add-brand', component: AddBrandComponent,canActivate: [AuthGuard]},
  { path: 'delete-brand', component: DeleteBrandComponent,canActivate: [AuthGuard]},
  { path: 'detail-brand/:id', component: DetailBrandComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
