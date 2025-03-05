import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { DeleteBrandComponent } from './delete-brand/delete-brand.component';
import { DetailBrandComponent } from './detail-brand/detail-brand.component';
import { BrandsComponent } from './brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddBrandComponent,
    EditBrandComponent,
    DeleteBrandComponent,
    DetailBrandComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule,
    ClarityModule,
    CdsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class BrandModule { }
