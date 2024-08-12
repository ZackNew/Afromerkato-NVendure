import {
  UuidIdStrategy,
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import { compileUiExtensions, setBranding } from "@vendure/ui-devkit/compiler";

import { HardenPlugin } from "@vendure/harden-plugin";

import "dotenv/config";
import path from "path";
import { AMOrderCodeStrategy } from "./config/am-order-code.strategy";
import { ReportsPlugin } from "./plugins/reports/reports.plugin";
// import { QuotesPlugin } from "./plugins/quotes/quotes.plugin";
import { ReviewsPlugin } from "./plugins/reviews/reviews-plugin";
import { ChartsPlugin } from "./plugins/charts/charts.plugin";

const IS_DEV = process.env.APP_ENV === "dev";

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(IS_DEV
      ? {
          adminApiPlayground: {
            settings: { "request.credentials": "include" },
          },
          adminApiDebug: true,
          shopApiPlayground: {
            settings: { "request.credentials": "include" },
          },
          shopApiDebug: true,
        }
      : {}),
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET,
    },
  },
  dbConnectionOptions: {
    type: "mariadb",
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: false,
    migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
    logging: false,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  entityOptions: {
    // entityIdStrategy: new UuidIdStrategy(),
  },
  orderOptions: {
    orderCodeStrategy: new AMOrderCodeStrategy(),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {},
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
      // For local dev, the correct value for assetUrlPrefix should
      // be guessed correctly, but for production it will usually need
      // to be set manually to match your production url.
      assetUrlPrefix: IS_DEV ? undefined : "https://www.my-shop.com/assets/",
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),

    /**
     * Email plugin
     */

    // EmailPlugin.init({
    //   devMode: true,
    //   outputPath: path.join(__dirname, "../static/email/test-emails"),
    //   route: "mailbox",
    //   handlers: defaultEmailHandlers,
    //   templatePath: path.join(__dirname, "../static/email/templates"),
    //   globalTemplateVars: {
    //     // The following variables will change depending on your storefront implementation.
    //     // Here we are assuming a storefront running at http://localhost:8080.
    //     fromAddress: '"example" <noreply@example.com>',
    //     verifyEmailAddressUrl: "http://localhost:8080/verify",
    //     passwordResetUrl: "http://localhost:8080/password-reset",
    //     changeEmailAddressUrl:
    //       "http://localhost:8080/verify-email-address-change",
    //   },
    // }),
    HardenPlugin.init({
      maxQueryComplexity: 500,
      apiMode: IS_DEV ? "dev" : "prod",
    }),
    AdminUiPlugin.init({
      route: "admin",
      port: 3002,
      adminUiConfig: {
        brand: "Afromerkato",
        apiPort: 3000,
        hideVersion: true,
        loginImageUrl:
          "https://cdn.pixabay.com/photo/2020/02/14/18/05/ecommerce-4849055_1280.jpg",
      },
      /**
       * When in dev mode
       */
      app: compileUiExtensions({
        outputPath: path.join(__dirname, "../admin-ui"),
        devMode: IS_DEV,
        extensions: [
          setBranding({
            // The small logo appears in the top left of the screen
            smallLogoPath: path.join(__dirname, "images/afro2.png"),
            // The large logo is used on the login page
            largeLogoPath: path.join(__dirname, "images/afro2.png"),
            faviconPath: path.join(__dirname, "images/afro2.png"),
          }),
          {
            translations: { en: path.join(__dirname, "translations/en.json") },
          },
          ReportsPlugin.ui,
          //QuotesPlugin.ui,
          ReviewsPlugin.uiExtensions,
          ChartsPlugin.ui,
        ],
      }),

      /**
       * When in prod mode
       */
      // app: {
      //   path: path.join(__dirname, "../dist"),
      // },
    }),
    ReportsPlugin,
    // QuotesPlugin.init({}),
    ReviewsPlugin,
    ChartsPlugin.init({}),
  ],
};
