import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  SHIPPING_METHOD_ACTIVITY_LOGS,
  REVERT_SHIPPING_METHOD_CHANGE,
  DELETE_SHIPPING_METHOD_ACTIVITY_LOG,
} from "../activity-log-resolver.graphql";
import { Apollo } from "apollo-angular";
import { NotificationService } from "@vendure/admin-ui/core";
import { ActivityLogActions } from "../../actions";
@Component({
  selector: "vdr-shipping-method-activity-log-list",
  template: `<vdr-page-header>
      <vdr-page-title></vdr-page-title>
    </vdr-page-header>
    <vdr-page-body>
      <vdr-page-block> </vdr-page-block>
      <vdr-activity-log-list
        [logs]="logs"
        (revertChanges)="revertChanges($event[0])"
        (deleteActivityLog)="deleteActivityLog($event[0])"
        (applyFilter)="getList($event)"
      ></vdr-activity-log-list>
      <vdr-page-body> </vdr-page-body
    ></vdr-page-body> `,
})
export class ShippingMethodActivityLogListComponent
  extends ActivityLogActions
  implements OnInit
{
  constructor(
    dataService: Apollo,
    cdr: ChangeDetectorRef,
    ns: NotificationService,
  ) {
    super(
      cdr,
      ns,
      dataService,
      SHIPPING_METHOD_ACTIVITY_LOGS,
      REVERT_SHIPPING_METHOD_CHANGE,
      DELETE_SHIPPING_METHOD_ACTIVITY_LOG,
    );
  }
  ngOnInit(): void {
    // console.log('from ShippingMethodActivityLogListComponent')
    this.getList();
  }
}
