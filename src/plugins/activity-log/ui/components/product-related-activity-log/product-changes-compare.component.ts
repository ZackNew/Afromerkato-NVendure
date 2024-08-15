import { Component, OnInit } from "@angular/core";
import { DataService } from "@vendure/admin-ui/core";
import { ActivityLog } from "../../gql/graphql";
@Component({
  selector: "vdr-product-changes-compare",
  template: ` <div>Hello Man and woman</div> `,
})
export class ProductChangesCompareComponent implements OnInit {
  logs: ActivityLog[];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {}
}
