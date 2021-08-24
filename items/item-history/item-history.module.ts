import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemHistoryPageRoutingModule } from './item-history-routing.module';

import { ItemHistoryPage } from './item-history.page';
import { DxDataGridModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemHistoryPageRoutingModule,
    DxDataGridModule,ReactiveFormsModule
  ],
  declarations: [ItemHistoryPage]
})
export class ItemHistoryPageModule {}
