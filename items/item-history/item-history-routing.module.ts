import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemHistoryPage } from './item-history.page';

const routes: Routes = [
  {
    path: '',
    component: ItemHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemHistoryPageRoutingModule {}
