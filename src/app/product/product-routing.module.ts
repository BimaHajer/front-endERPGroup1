import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent,canActivate: [AuthGuard]},
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard]},
  { path: 'delete-product', component: DeleteProductComponent,canActivate: [AuthGuard]},
  { path: 'detail-product/:id', component: DetailProductComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
