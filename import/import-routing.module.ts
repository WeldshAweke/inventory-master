import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportPage } from './import.page';

const routes: Routes = [
  {
    path: '',
    component: ImportPage
  },  {
    path: 'import-details',
    loadChildren: () => import('./import-details/import-details.module').then( m => m.ImportDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportPageRoutingModule {}
