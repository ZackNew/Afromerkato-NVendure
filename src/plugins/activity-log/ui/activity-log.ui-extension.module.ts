import { NgModule } from '@angular/core';
import { SharedModule , addNavMenuSection} from '@vendure/admin-ui/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ActivityLogSharedModule } from './activity-log.shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    ActivityLogSharedModule,
  ],
  providers:[
  ],
})
export class ActivityLogUiExtensionModule { }
