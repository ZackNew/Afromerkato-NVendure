import { CrudPermissionDefinition } from "@vendure/core";
export const activityLogsPermission= new CrudPermissionDefinition('ActivityLogs',
                operation=>`Grants Permission to Activity Logs`)