import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaimentRoutingModule } from './paiment-routing.module';
import { DeletePaimentComponent } from './delete-paiment/delete-paiment.component';
import { DetailPaimentComponent } from './detail-paiment/detail-paiment.component';
import { EditPaimentComponent } from './edit-paiment/edit-paiment.component';
import { AddPaimentComponent } from './add-paiment/add-paiment.component';
import { PaimentsComponent } from './paiments/paiments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DeletePaimentComponent,
    DetailPaimentComponent,
    EditPaimentComponent,
    AddPaimentComponent,
    PaimentsComponent
  ],
  imports: [
    CommonModule,
    PaimentRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class PaimentModule { }
