import { SharedModule, addNavMenuItem } from "@vendure/admin-ui/core";
export default [
  // Add your providers here
  addNavMenuItem(
    {
      id: "quotes",
      label: "Quotes",
      icon: "block-quote",
      routerLink: ["/extensions/quotes"],
      requiresPermission: (userPermisions: string[]): boolean => {
        return userPermisions.filter((item) => item.match("Quotes")).length > 0;
      },
    },
    "sales",
  ),
];
