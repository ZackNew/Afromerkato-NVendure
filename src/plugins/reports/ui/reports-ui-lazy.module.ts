
import { ReportsSharedModule } from "./reports-shared.module";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewRefundReportComponent } from "./components/new-refund-report/new-refund-report.component";
import { NewSalesReportComponent } from "./components/new-sales-report/new-sales-report.component";
import { NewStockReportComponent } from "./components/new-stock-report/new-stock-report.component";



@NgModule({
    imports: [
        ReportsSharedModule,
        RouterModule.forChild([ 
            {
                path: 'new-refund-report',
                pathMatch:'full',
                component: NewRefundReportComponent,
                data: { breadcrumb: 'Refund Report' },
                title:"Refund report"         
            
            },
            {
                path: 'new-sales-report',
                pathMatch:'full',
                component: NewSalesReportComponent,
                 data: { breadcrumb: 'Sales Report' },
                 title:"Sales report"
            },
            {
                path: 'new-stock-report',
                pathMatch:"full",
                component:NewStockReportComponent,
                data: { breadcrumb: 'Stock Report' },
                title:"Stock report"
            
            },
        ]),
    ],
    declarations: [
        NewRefundReportComponent,
        NewSalesReportComponent,
        NewStockReportComponent

    ],
})
export class ReportsUiLazyModule {}
