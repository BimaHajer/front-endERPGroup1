import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddModeleComponent } from './add-modele/add-modele.component';
import { DeleteModeleComponent } from './delete-modele/delete-modele.component';
import { DetailModeleComponent } from './detail-modele/detail-modele.component';
import { EditModeleComponent } from './edit-modele/edit-modele.component';
import { ModelesComponent } from './modeles/modeles.component';

const routes: Routes = [
  { path: '', component: ModelesComponent,canActivate: [AuthGuard]},
  { path: 'edit-modele/:id', component: EditModeleComponent, canActivate: [AuthGuard] },
  { path: 'add-modele', component: AddModeleComponent,canActivate: [AuthGuard]},
  { path: 'delete-modele', component: DeleteModeleComponent,canActivate: [AuthGuard]},
  { path: 'detail-modele/:id', component: DetailModeleComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeleRoutingModule { }
