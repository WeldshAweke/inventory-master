import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerDetailsPageRoutingModule } from './customer-details-routing.module';
import { DxDataGridModule,DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DxDataGridModule,DxButtonModule,
    CustomerDetailsPageRoutingModule
  ],
  declarations: []
})
export class CustomerDetailsPageModule {}
