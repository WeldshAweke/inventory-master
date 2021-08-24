import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DxListModule, DxLookupModule, DxTemplateModule,DxDataGridModule,
  DxSelectBoxModule,DxButtonModule } from 'devextreme-angular';
import { RecievePaymentPageRoutingModule } from './recieve-payment-routing.module';
import { RecievePaymentPage } from './recieve-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DxLookupModule,
    DxTemplateModule,
    RecievePaymentPageRoutingModule,
    DxListModule,DxDataGridModule,
    DxSelectBoxModule,DxButtonModule
  ],
  declarations: [RecievePaymentPage]
})
export class RecievePaymentPageModule {}
