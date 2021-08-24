import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountStockPage } from './count-stock.page';

const routes: Routes = [
  {
    path: '',
    component: CountStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountStockPageRoutingModule {}
