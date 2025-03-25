import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddPaimentComponent } from './add-paiment/add-paiment.component';
import { DeletePaimentComponent } from './delete-paiment/delete-paiment.component';
import { DetailPaimentComponent } from './detail-paiment/detail-paiment.component';
import { EditPaimentComponent } from './edit-paiment/edit-paiment.component';
import { PaimentsComponent } from './paiments/paiments.component';

const routes: Routes = [
  { path: '', component: PaimentsComponent,canActivate: [AuthGuard]},
  { path: 'edit-paiment/:id', component: EditPaimentComponent, canActivate: [AuthGuard] },
  { path: 'add-paiment', component: AddPaimentComponent,canActivate: [AuthGuard]},
  { path: 'delete-paiment', component: DeletePaimentComponent,canActivate: [AuthGuard]},
  { path: 'detail-paiment/:id', component: DetailPaimentComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaimentRoutingModule { }
