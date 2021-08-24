import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QtyDetailPage } from './qty-detail.page';

const routes: Routes = [
  {
    path: '',
    component: QtyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QtyDetailPageRoutingModule {}
