import { addNavMenuSection } from "@vendure/admin-ui/core";
export default [
  // Add your providers here
  addNavMenuSection({
    id: "reports",
    label: "Reports",
    requiresPermission(userPermissions: string[]): boolean {
      return (
        userPermissions.filter(
          (item) =>
            item === "CreateStockReport" ||
            item === "CreateSalesReport" ||
            item === "CreateRefundReport"
        ).length > 0
      );
    },
    collapsible: false,
    collapsedByDefault: false,
    items: [
      {
        id: "refund-report",
        label: "Refund report",
        routerLink: ["/extensions/reports/new-refund-report"],
        requiresPermission: "CreateRefundReport",
        icon: "recycle",
      },
      {
        id: "sales-report",
        label: "Sales report",
        routerLink: ["/extensions/reports/new-sales-report"],
        requiresPermission: "CreateSalesReport",
        icon: "checkbox-list",
      },
      {
        id: "stock-report",
        label: "Stock report",
        routerLink: ["/extensions/reports/new-stock-report"],
        requiresPermission: "CreateStockReport",
        icon: "storage",
      },
    ],
  },'customers'),
  
];
