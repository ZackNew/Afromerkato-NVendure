import { PluginCommonModule, Type, VendurePlugin } from "@vendure/core";
import { Arifpay } from "./entities/arif-pay.entity";
import { EtSwitchJob } from "./entities/et-switch-job.entity";
import { adminApiExtensions, shopApiExtensions } from "./api/api-extensions";
import { ArifPayController } from "./arifpay-controller";
import { ProductsController } from "./payment-controller";
import { paymentApiResolver } from "./api/shop.resolver";
import { ArifPayServices } from "./services/arifpay.service";
import { paymentMethodsServices } from "./services/paymentMethods.service";
import { TelebirrController } from "./telebirr-controller";
import { ScheduleModule } from "@nestjs/schedule";

@VendurePlugin({
  imports: [PluginCommonModule, ScheduleModule.forRoot()],
  providers: [ArifPayServices, paymentMethodsServices],
  configuration: (config) => {
    return config;
  },
  compatibility: "^3.0.0",
  entities: [Arifpay, EtSwitchJob],
  controllers: [ArifPayController, ProductsController, TelebirrController],
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [paymentApiResolver],
  },
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [],
  },
})
export class PaymentMethodPlugin {}
