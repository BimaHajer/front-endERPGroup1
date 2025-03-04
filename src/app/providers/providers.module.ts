import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ProviderssComponent } from './providerss/providerss.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import { ClarityModule } from '@clr/angular';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    DeleteComponent,
    ProviderssComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,SharedModule
  ]
})
export class ProvidersModule { }
