import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivityLogSharedModule } from './activity-log.shared.module';
import { ProductRelatedActivityLogListComponent } from './components/product-related-activity-log/product-related-activity-log-list.component';
import { OrderRelatedActivityLogListComponent } from './components/order-related-activity-log/order-related-activity-log-list.component';
import { CustomerRelatedActivityLogListComponent } from './components/customer-related-activity-log/customer-related-activity-log-list.component';
import { ShippingMethodActivityLogListComponent } from './components/shipping-method-activity-log/shipping-method-activity-log-list.component';
import { CollectionActivityLogListComponent } from './components/collection-activity-log/collection-activity-log-list.component';
import { PaymentMethodActivityLogListComponent } from './components/payment-method-activity-log/payment-method-activity-log-list.component';

@NgModule({
    imports: [
        ActivityLogSharedModule,
        RouterModule.forChild([
            {
                path: 'product-related',
                component: ProductRelatedActivityLogListComponent,
                pathMatch:'full',
                  data: { breadcrumb: 'Product Related Logs' },
                title:'Product Related Logs'
            },
            {
                path: 'customer-related',
                pathMatch:'full',
                component: CustomerRelatedActivityLogListComponent,
                 data: { breadcrumb: 'Customer Related Logs' },
                title:"Customer Related Logs"
            },
            {
                path: 'order-related',
                pathMatch:'full',
                component: OrderRelatedActivityLogListComponent,
                 data: { breadcrumb: 'Order Related Logs' },
                title:"Order Related Logs"
            },
            // {
            //     path: 'brand',
            //     component: BrandActivityLogListComponent,
            // },
            // {
            //     path: 'industry',
            //     component: IndustryActivityLogListComponent,
            // },
            {
                path: 'shipping-method',
                pathMatch:'full',
                component: ShippingMethodActivityLogListComponent,
                 data: { breadcrumb: 'Shipping Related Logs' },
                title:"Shipping Related Logs"
            },
            {
                path: 'collection',
                pathMatch:'full',
                component: CollectionActivityLogListComponent,
                 data: { breadcrumb: 'Collection Related Logs' },
                title:'Collection Related Logs'
            },
            // {
            //     path: 'payment-method',
            //     component: PaymentMethodActivityLogListComponent,
            // },
            // {
            //     path: 'price-list',
            //     component: PriceListActivityLogListComponent,
            // },
        ]),
    ],
    declarations: [
    ],
})
export class ActivityLogUiLazyModule {}