import { registerRouteComponent } from '@vendure/admin-ui/core';
import { ProductRelatedActivityLogListComponent } from './components/product-related-activity-log/product-related-activity-log-list.component';
import { CustomerRelatedActivityLogListComponent } from './components/customer-related-activity-log/customer-related-activity-log-list.component';
import { OrderRelatedActivityLogListComponent } from './components/order-related-activity-log/order-related-activity-log-list.component';
import { ShippingMethodActivityLogListComponent } from './components/shipping-method-activity-log/shipping-method-activity-log-list.component';
import { CollectionActivityLogListComponent } from './components/collection-activity-log/collection-activity-log-list.component';

export default [
    // Add your custom routes here
      registerRouteComponent({
        component: ProductRelatedActivityLogListComponent,
        path: ':id',
        title: 'Product Related Logs',
        breadcrumb: 'Product Related Logs',
    }),
       registerRouteComponent({
        component: CustomerRelatedActivityLogListComponent,
        path: ':id',
        title: 'Customer Related Logs',
        breadcrumb: 'Customer Related Logs',
    }),
         registerRouteComponent({
        component: OrderRelatedActivityLogListComponent,
        path: ':id',
        title: 'Order Related Logs',
        breadcrumb: 'Order Related Logs',
    }),
      registerRouteComponent({
        component: ShippingMethodActivityLogListComponent,
        path: ':id',
        title: 'Shipping Related Logs',
        breadcrumb: 'Shipping Related Logs',
    }),
       registerRouteComponent({
        component: CollectionActivityLogListComponent,
        path: ':id',
        title: 'Collection Related Logs',
        breadcrumb: 'Collection Related Logs',
    }),
];
