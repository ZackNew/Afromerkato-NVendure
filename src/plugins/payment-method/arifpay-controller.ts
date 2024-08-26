// products.controller.ts
import { Controller, Get, Post, Body } from "@nestjs/common";
import {
  Ctx,
  Order,
  OrderService,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { ArifPaySessionStatus, Arifpay } from "./entities/arif-pay.entity";

@Controller("payments")
export class ArifPayController {
  constructor(
    private orderSerice: OrderService,
    private connection: TransactionalConnection,
  ) {}

  @Post("arifpay")
  async findAll(@Ctx() ctx: RequestContext, @Body() data: any) {
    const arifpayRepo = this.connection.rawConnection.getRepository(Arifpay);
    const orderRepo = this.connection.rawConnection.getRepository(Order);

    console.log(data);

    // cheek if the status is succes
    if (data.transaction.transactionStatus == "SUCCESS") {
      const session = await arifpayRepo.findOneBy({
        sessionId: data.sessionId,
      });
      const order = await this.orderSerice.findOneByCode(
        ctx,
        session!.orderCode,
      );

      //update order
      if (order) {
        await this.orderSerice.addManualPaymentToOrder(ctx, {
          method: "arifpay",
          orderId: order.id,
          transactionId: data.transaction.transactionId,
          metadata: "",
        });

        await arifpayRepo.update(session!.id, {
          status: ArifPaySessionStatus.SUCCESS,
        });
      } else {
        console.log("sorry the order is canceled");
        // const res = await this.orderSerice.u(order.id, {
        //   state: "AddingItems",
        //   active: true,
        // });
      }
    }
  }
}
