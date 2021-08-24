import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportDetailsPageRoutingModule } from './import-details-routing.module';

import { ImportDetailsPage } from './import-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ImportDetailsPage]
})
export class ImportDetailsPageModule {}
