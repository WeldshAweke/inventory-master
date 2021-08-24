import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreTransferPage } from './store-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: StoreTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreTransferPageRoutingModule {}
