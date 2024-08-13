import { PermissionDefinition } from "@vendure/core";

export const readChartsPermissionDefinition = new PermissionDefinition({
  name: "ReadCharts",
  description: "Allows reading Charts on admin dashboard",
});
