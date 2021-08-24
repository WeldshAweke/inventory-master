import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreTransferPageRoutingModule } from './store-transfer-routing.module';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { StoreTransferPage } from './store-transfer.page';
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreTransferPageRoutingModule,
    DxLookupModule, DxTemplateModule,
    ReactiveFormsModule,
    DxDataGridModule, DxButtonModule
  ],
  declarations: [StoreTransferPage]
})
export class StoreTransferPageModule {}
