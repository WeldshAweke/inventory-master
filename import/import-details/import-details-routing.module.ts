import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportDetailsPage } from './import-details.page';

const routes: Routes = [
  {
    path: '',
    component: ImportDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportDetailsPageRoutingModule {}
