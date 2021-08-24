import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CountStockPageRoutingModule } from './count-stock-routing.module';
import { CountStockPage } from './count-stock.page';
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountStockPageRoutingModule,
    ReactiveFormsModule,
    DxDataGridModule, DxButtonModule,
    DxLookupModule, DxTemplateModule
  ],
  declarations: [CountStockPage]
})
export class CountStockPageModule {}
