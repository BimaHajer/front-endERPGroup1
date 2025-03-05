import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddComponent } from './add/add.component';
import { ClientsComponent } from './clients/clients.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: ClientsComponent,canActivate: [AuthGuard]},
  { path: 'edit/:id', component: EditComponent,canActivate: [AuthGuard]},
  { path: 'add', component: AddComponent,canActivate: [AuthGuard]},
  { path: 'delete', component: DeleteComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: DetailComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
