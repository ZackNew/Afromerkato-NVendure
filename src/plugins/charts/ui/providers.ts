import { registerDashboardWidget } from "@vendure/admin-ui/core";

export default [
  registerDashboardWidget("stock-charts", {
    title: "Stocks Added",
    supportedWidths: [4, 6, 8, 12],
    requiresPermissions: ["ReadCharts"],
    loadComponent: () =>
      import("./components/stock-chart/stock-chart.component").then(
        (m) => m.StockChartComponent,
      ),
  }),
  registerDashboardWidget("sales-charts", {
    title: "Sales Added",
    supportedWidths: [4, 6, 8, 12],
    requiresPermissions: ["ReadCharts"],
    loadComponent: () =>
      import("./components/sales-chart/sales-chart.component").then(
        (m) => m.SalesChartComponent,
      ),
  }),
  registerDashboardWidget("all-sales-charts", {
    title: "All Order State",
    supportedWidths: [4, 6, 8, 12],
    requiresPermissions: ["ReadCharts"],
    loadComponent: () =>
      import("./components/all-sales-chart/all-sales-chart.component").then(
        (m) => m.AllSalesChartComponent,
      ),
  }),
  //  registerDashboardWidget('reviews', {
  //     title: 'Latest reviews',
  //     supportedWidths: [4, 6, 8, 12],
  //     requiresPermissions: ['ReadCharts'],
  //     loadComponent: () =>
  //         import('./components/reviews-widget/reviews-widget.component').then(
  //             m => m.ReviewsWidgetComponent,
  //         ),
  // }),
];
