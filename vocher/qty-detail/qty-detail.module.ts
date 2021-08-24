import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QtyDetailPageRoutingModule } from './qty-detail-routing.module';

import { QtyDetailPage } from './qty-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QtyDetailPageRoutingModule
  ],
  declarations: [QtyDetailPage]
})
export class QtyDetailPageModule {}
