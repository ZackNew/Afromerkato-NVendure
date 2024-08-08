import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { adminApiExtension } from './api/api-extensions';
import { createRefundReportPermission, createSalesReportPermission, createStockReportPermission } from './api/permissions';
import { ReportAdminResolver } from './api/report-admin.resolver';
import { REPORTS_PLUGIN_OPTIONS } from './constants';
import { RefundReportService } from './services/refund-admin-api.service';
import { SalesReportService } from './services/sales-admin-api.service';
import { StockReportService } from './services/stock-admin-api.service';
import { PluginInitOptions } from './types';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: REPORTS_PLUGIN_OPTIONS, useFactory: () => ReportsPlugin.options },
        StockReportService,RefundReportService,SalesReportService
    ],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        config.authOptions.customPermissions.push(
            createRefundReportPermission,
            createSalesReportPermission,
            createStockReportPermission
        );
        return config;
    },
    compatibility: '^3.0.0',
    adminApiExtensions: {
        schema: adminApiExtension,
        resolvers: [ReportAdminResolver]
    },
})
export class ReportsPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<ReportsPlugin> {
        this.options = options;
        return ReportsPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'reports',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'reports', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
         ngModules: [
      {
        type: "shared" as const,
        ngModuleFileName: "reports-ui-extension.module.ts",
        ngModuleName: "ReportsUiExtensionModule",
      },
      {
        type: "lazy" as const,
        route: "reports",
        ngModuleFileName: "reports-ui-lazy.module.ts",
        ngModuleName: "ReportsUiLazyModule",
      },
    ],
        
    };
}
