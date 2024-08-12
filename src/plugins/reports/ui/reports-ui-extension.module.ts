import { NgModule } from '@angular/core';
import { SharedModule,addNavMenuSection } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ReportsSharedModule } from './reports-shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    ReportsSharedModule,
  ],
  providers:[]
})
export class ReportsUiExtensionModule { }
