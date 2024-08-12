import { registerRouteComponent } from '@vendure/admin-ui/core';
import { NewStockReportComponent } from './components/new-stock-report/new-stock-report.component';
import { NewSalesReportComponent } from './components/new-sales-report/new-sales-report.component';
import { NewRefundReportComponent } from './components/new-refund-report/new-refund-report.component';

export default  [
   
      registerRouteComponent({
        component: NewRefundReportComponent,
        path: ':id',
        title: 'Refund report',
        breadcrumb: 'Refund Report',
    }),
    
    registerRouteComponent({
        component: NewSalesReportComponent,
        path: ':id',
        title: 'Sales report',
        breadcrumb: 'Sales Report',
    }), 
    registerRouteComponent({
        component: NewStockReportComponent,
        path: ':id',
        title: 'Stock report',
        breadcrumb: 'Stock Report',

    }),
];