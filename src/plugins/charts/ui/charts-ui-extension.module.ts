import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

import { ChartsSharedModule } from './charts-shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    ChartsSharedModule,
  ],
  providers:[
  ]
})
export class ChartsUiExtensionModule { }
