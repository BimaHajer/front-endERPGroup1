import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { ClientsComponent } from './clients/clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { ClarityIcons, cloneIcon } from '@cds/core/icon';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../shared/shared.module';
ClarityIcons.addIcons(cloneIcon);


@NgModule({
  declarations: [
    AddComponent,
    DeleteComponent,
    EditComponent,
    DetailComponent,
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientModule { }
