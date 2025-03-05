import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeleRoutingModule } from './modele-routing.module';
import { AddModeleComponent } from './add-modele/add-modele.component';
import { DeleteModeleComponent } from './delete-modele/delete-modele.component';
import { EditModeleComponent } from './edit-modele/edit-modele.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { ModelesComponent } from './modeles/modeles.component';
import { DetailModeleComponent } from './detail-modele/detail-modele.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddModeleComponent,
    DeleteModeleComponent,
    EditModeleComponent,
    ModelesComponent,
    DetailModeleComponent,
  ],
  imports: [
    CommonModule,
    ModeleRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ModeleModule { }
