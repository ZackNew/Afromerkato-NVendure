import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { CHARTS_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
import { readChartsPermissionDefinition } from './permissions';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: CHARTS_PLUGIN_OPTIONS, useFactory: () => ChartsPlugin.options }],
     configuration: (config) => {
    config.authOptions.customPermissions.push(readChartsPermissionDefinition);
    return config;
  },
    compatibility: '^3.0.0',

})
export class ChartsPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<ChartsPlugin> {
        this.options = options;
        return ChartsPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'charts-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'charts', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
        ngModules: [
      {
        type: "shared" as const,
        ngModuleFileName: "charts-ui-extension.module.ts",
        ngModuleName: "ChartsUiExtensionModule",
      },
      {
        type: "lazy" as const,
        route: "charts",
        ngModuleFileName: "charts-ui-lazy.module.ts",
        ngModuleName: "ChartsUiLazyModule",
      },
    ],
    };
}
