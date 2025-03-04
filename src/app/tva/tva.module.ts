import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvaRoutingModule } from './tva-routing.module';
import { AddTvaComponent } from './add-tva/add-tva.component';
import { DeleteTvaComponent } from './delete-tva/delete-tva.component';
import { DetailTvaComponent } from './detail-tva/detail-tva.component';
import { TvasComponent } from './tvas/tvas.component';
import { EditTvaComponent } from './edit-tva/edit-tva.component';
import { CdsModule } from '@cds/angular';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddTvaComponent,
    DeleteTvaComponent,
    DetailTvaComponent,
    TvasComponent,
    EditTvaComponent
  ],
  imports: [
    CommonModule,
    TvaRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule, 
    SharedModule,ReactiveFormsModule,SharedModule
  ]
})
export class TvaModule { }
