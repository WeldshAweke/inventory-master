import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStockPageRoutingModule } from './add-stock-routing.module';
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';
import { AddStockPage } from './add-stock.page';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStockPageRoutingModule,
    ReactiveFormsModule,
    DxDataGridModule, DxButtonModule ,
    DxLookupModule, DxTemplateModule
  ],
  declarations: [AddStockPage]
})
export class AddStockPageModule {}
