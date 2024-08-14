import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

import { adminApiExtensions } from './api/api-extensions';
import { CollectionActivityLogResolver } from './api/collection-activity-log.resolvers';
import { CustomerRelatedActivityLogResolver } from './api/customer-related-activity-log.resolvers';
import { ProductRelatedActivityLogResolver } from './api/product-related-activity-log.resolvers';
import { ShippingMethodActivityLogResolver } from './api/shipping-method-activity-log.resolvers';
import { ACTIVITY_LOG_PLUGIN_OPTIONS } from './constants';
import { CollectionActivityLogEntity } from './entities/collection-activity-log.entity';
import { CustomerRelatedActivityLogEntity } from './entities/customer-related-activity-log.entity';
import { OrderRelatedActivityLogEntity } from './entities/order-related-activity-log.entity';
import { PaymentMethodActivityLogEntity } from './entities/payment-method-activity-log.entity';
import { ProductRelatedActivityLogEntity } from './entities/product-related-activity-log.entity';
import { ShippingMethodActivityLogEntity } from './entities/shipping-method-activity-log.entity';
import { CollectionActivityLogService } from './services/collection-activity-log.service';
import { CustomerRelatedActivityLogService } from './services/customer-related-activity-log.service';
import { ProductRelatedActivityLogService } from './services/product-related-activity-log.service';
import { ShippingMethodActivityLogService } from './services/shipping-method-activity-log.service';
import { PluginInitOptions } from './types';
import { activityLogsPermission } from './permission';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: ACTIVITY_LOG_PLUGIN_OPTIONS, useFactory: () => ActivityLogPlugin.options },
         ProductRelatedActivityLogService,
     // OrderRelatedActivityLogService,
        ShippingMethodActivityLogService,
     // PaymentMethodActivityLogService,
        CustomerRelatedActivityLogService,
        CollectionActivityLogService
    ],
    configuration: config => {
         config.authOptions.customPermissions.push(activityLogsPermission);
    return config;
    },
    compatibility: '^3.0.0',
    entities: [
         ProductRelatedActivityLogEntity,
         OrderRelatedActivityLogEntity,
         ShippingMethodActivityLogEntity,
         PaymentMethodActivityLogEntity,
         CustomerRelatedActivityLogEntity,
         CollectionActivityLogEntity
    ],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [
            ProductRelatedActivityLogResolver,
        // OrderRelatedActivityLogResolver,
           ShippingMethodActivityLogResolver,
      // PaymentMethodActivityLogResolver,
          CustomerRelatedActivityLogResolver,
          CollectionActivityLogResolver
        ]
    },
})
export class ActivityLogPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<ActivityLogPlugin> {
        this.options = options;
        return ActivityLogPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'activity-log-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'activity-log', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    ngModules: [
      {
        type: "shared" as const,
        ngModuleFileName: "activity-log.ui-extension.module.ts",
        ngModuleName: "ActivityLogUiExtensionModule",
      },
      {
        type: "lazy" as const,
        route: "activity-logs",
        ngModuleFileName: "activity-log.ui-lazy.module.ts",
        ngModuleName: "ActivityLogUiLazyModule",
      },
    ],
    };
}
