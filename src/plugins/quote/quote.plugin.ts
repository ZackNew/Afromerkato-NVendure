import { PluginCommonModule, Type, VendurePlugin } from "@vendure/core";
import { AdminUiExtension } from "@vendure/ui-devkit/compiler";
import * as path from "path";

import { adminApiExtensions, shopApiExtensions } from "./api/api-extensions";
import { QUOTE_PLUGIN_OPTIONS } from "./constants";
import { Quote } from "./entities/quote.entity";
import { PluginInitOptions } from "./types";
import { QuoteAdminResolver } from "./api/quote.admin.resolver";
import { QuoteShopResolver } from "./api/quote.shop.resolver";
import {
  deleteQuotePermissionDefinition,
  readQuotesPermissionDefinition,
  updateQuotesPermissionDefinition,
} from "./permissions";
import { QuoteAccessAuthorizationMiddleware } from "./quote-access-authorisation.middleware";
import { QuoteService } from "./services/quote.service";
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    { provide: QUOTE_PLUGIN_OPTIONS, useFactory: () => QuotePlugin.options },
    QuoteService,
  ],
  configuration: (config) => {
    config.authOptions.customPermissions.push(
      readQuotesPermissionDefinition,
      deleteQuotePermissionDefinition,
      updateQuotesPermissionDefinition,
    );
    config.apiOptions.middleware.push({
      handler: QuoteAccessAuthorizationMiddleware.prototype.use,
      route: "static/assets/quotes",
    });
    return config;
  },
  compatibility: "^3.0.0",
  entities: [Quote],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [QuoteAdminResolver],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [QuoteShopResolver],
  },
})
export class QuotePlugin {
  static options: PluginInitOptions;

  static init(options: PluginInitOptions): Type<QuotePlugin> {
    this.options = options;
    return QuotePlugin;
  }

  static ui: AdminUiExtension = {
    id: "quote-ui",
    extensionPath: path.join(__dirname, "ui"),
    routes: [{ route: "quote", filePath: "routes.ts" }],
    providers: ["providers.ts"],
    ngModules: [
      {
        type: "shared" as const,
        ngModuleFileName: "nav.module.ts",
        ngModuleName: "NavSharedModule",
      },
      {
        type: "lazy" as const,
        route: "quotes",
        ngModuleFileName: "page.module.ts",
        ngModuleName: "PageModule",
      },
    ],
  };
}
