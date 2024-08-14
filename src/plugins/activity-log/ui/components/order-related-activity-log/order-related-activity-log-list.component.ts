import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ORDER_ACTIVITY_LOGS, REVERT_ORDER_RELATED_CHANGE, DELETE_ORDER_RELATED_ACTIVITY_LOG } from '../activity-log-resolver.graphql';
import { Apollo } from 'apollo-angular';
import { NotificationService } from '@vendure/admin-ui/core';
import { ActivityLogActions } from '../../actions';
@Component({
    selector: 'vdr-order-related-activity-log-list',
    template:`
    <vdr-page-header>
      <vdr-page-title></vdr-page-title>
   </vdr-page-header>
   <vdr-page-body>
     <vdr-page-block>
     </vdr-page-block>
    <vdr-activity-log-list [logs]="logs"
    (revertChanges)="revertChanges($event[0])"
        (deleteActivityLog)="deleteActivityLog($event[0])"
        (applyFilter)="getList($event)"
    ></vdr-activity-log-list>
   <vdr-page-body> 
    `
  })
export class OrderRelatedActivityLogListComponent extends ActivityLogActions implements OnInit {
    constructor( dataService: Apollo,  cdr: ChangeDetectorRef,  ns: NotificationService){
        super(cdr,ns,dataService,ORDER_ACTIVITY_LOGS,REVERT_ORDER_RELATED_CHANGE,DELETE_ORDER_RELATED_ACTIVITY_LOG);
    }
    ngOnInit(): void {
        // console.log('from OrderRelatedActivityLogListComponent')
        this.getList();
    }
}