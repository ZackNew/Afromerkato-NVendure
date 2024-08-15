import { NgModule } from "@angular/core";
import { SharedModule } from "@vendure/admin-ui/core";
import { ProductRelatedActivityLogListComponent } from "./components/product-related-activity-log/product-related-activity-log-list.component";
import { OrderRelatedActivityLogListComponent } from "./components/order-related-activity-log/order-related-activity-log-list.component";
import { ProductChangesCompareComponent } from "./components/product-related-activity-log/product-changes-compare.component";
import { CollectionActivityLogListComponent } from "./components/collection-activity-log/collection-activity-log-list.component";
import { ActivityLogListComponent } from "./components/activity-log-list/activity-log-list.component";
import { ShippingMethodActivityLogListComponent } from "./components/shipping-method-activity-log/shipping-method-activity-log-list.component";
import { PaymentMethodActivityLogListComponent } from "./components/payment-method-activity-log/payment-method-activity-log-list.component";
import { CustomerRelatedActivityLogListComponent } from "./components/customer-related-activity-log/customer-related-activity-log-list.component";
import { SelectMultiAdminDialogComponent } from "./components/select-multi-admin-dialog/select-multi-admin-dialog.component";
import { ActivityLogFilterComponent } from "./components/activity-log-filter/activity-log-filter.component";
import { AdminListComponent } from "./components/admin-list/admin-list.component";
@NgModule({
  imports: [SharedModule],
  declarations: [
    ProductRelatedActivityLogListComponent,
    AdminListComponent,
    CustomerRelatedActivityLogListComponent,
    SelectMultiAdminDialogComponent,
    ActivityLogFilterComponent,
    OrderRelatedActivityLogListComponent,
    ActivityLogListComponent,
    ProductChangesCompareComponent,
    ShippingMethodActivityLogListComponent,
    CollectionActivityLogListComponent,
    PaymentMethodActivityLogListComponent,
  ],
  exports: [
    SharedModule,
    ActivityLogListComponent,
    ProductChangesCompareComponent,
    ShippingMethodActivityLogListComponent,
    PaymentMethodActivityLogListComponent,
    AdminListComponent,
    CollectionActivityLogListComponent,
    ActivityLogFilterComponent,
  ],
  providers: [],
})
export class ActivityLogSharedModule {}
