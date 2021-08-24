import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CountSheetPageRoutingModule } from './count-sheet-routing.module';
import { CountSheetPage } from './count-sheet.page';
import { DxLookupModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { DxPopoverModule } from 'devextreme-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountSheetPageRoutingModule,
    ReactiveFormsModule,
    DxLookupModule, DxTemplateModule,
    NgxPaginationModule,DxPopoverModule,
    Ng2SearchPipeModule,DxDataGridModule, DxButtonModule
  ],
  declarations: [CountSheetPage]
})
export class CountSheetPageModule {}
