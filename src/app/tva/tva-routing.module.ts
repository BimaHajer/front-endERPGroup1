import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvasComponent } from './tvas/tvas.component';
import { AuthGuard } from '../auth/auth.guard';

import { AddTvaComponent } from './add-tva/add-tva.component';
import { DeleteTvaComponent } from './delete-tva/delete-tva.component';
import { DetailTvaComponent } from './detail-tva/detail-tva.component';
import { EditTvaComponent } from './edit-tva/edit-tva.component';

const routes: Routes = [
  { path: '', component: TvasComponent,canActivate: [AuthGuard]},
      { path: 'edit-tva/:id', component: EditTvaComponent,canActivate: [AuthGuard]},
      { path: 'add-tva', component: AddTvaComponent,canActivate: [AuthGuard]},
      { path: 'delete-tva', component: DeleteTvaComponent,canActivate: [AuthGuard]},
      { path: 'detail-tva/:id', component: DetailTvaComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvaRoutingModule { }
