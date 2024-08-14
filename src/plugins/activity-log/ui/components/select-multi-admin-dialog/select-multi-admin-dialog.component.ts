import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, Dialog } from "@vendure/admin-ui/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { GET_ADMINISTRATORS } from "../activity-log-resolver.graphql";

@Component({
  selector: "vdr-select-multi-admin-dialog",
  templateUrl: "./select-multi-admin-dialog.component.html",
  styleUrls: ["./select-multi-admin-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultiAdminDialogComponent
  implements Dialog<string[]>, OnInit
{
  resolveWith: (result?: string[]) => void;
  // group: GetCustomerGroups.Items;
  route: ActivatedRoute;
  selectedCustomerIds: string[] = [];
  customers$: Observable<any[]>;
  customersTotal$: Observable<number>;
  fetchGroupMembers$ = new BehaviorSubject<any>({
    skip: 0,
    take: 10,
    filterTerm: "",
  });

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const customerResult$ = this.fetchGroupMembers$.pipe(
      switchMap(({ skip, take, filterTerm }) => {
        return this.dataService
          .query(GET_ADMINISTRATORS, { take, skip })
          .mapStream((res: any) => res.administrators);
      }),
    );

    this.customers$ = customerResult$.pipe(map((res: any) => res.items));
    this.customersTotal$ = customerResult$.pipe(
      map((res: any) => res.totalItems),
    );
  }

  cancel() {
    this.resolveWith();
  }

  add() {
    this.resolveWith(this.selectedCustomerIds);
  }
}
