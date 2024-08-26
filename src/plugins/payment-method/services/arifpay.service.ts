import {
  ConfigService,
  OrderService,
  RequestContext,
  RequestContextService,
  TransactionalConnection,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";
import { ArifPayInput, ArifpayReturn } from "../gql/generated";
import axios, { AxiosHeaders } from "axios";
import * as crypto from "crypto";
import { Arifpay } from "../entities/arif-pay.entity";

@Injectable()
export class ArifPayServices {
  constructor(
    private connection: TransactionalConnection,
    private orderService: OrderService,
  ) {}

  generate(length: number): string {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2)); // Generate random bytes
    const generatedString = randomBytes.toString("hex").slice(0, length); // Convert bytes to hexadecimal string
    return generatedString;
  }

  async payWithArifPay(
    ctx: RequestContext,
    arifPayInput: ArifPayInput,
  ): Promise<any> {
    const aripayRepo = this.connection.rawConnection.getRepository(Arifpay);
    if (arifPayInput.orderCode) {
      const order = await this.orderService.findOneByCode(
        ctx,
        arifPayInput.orderCode,
      );
      if (order) {
        const url = "https://gateway.arifpay.net/api/checkout/session";
        let items = [];

        const orderItems = order.lines.map((orderLine) => {
          return {
            name: orderLine.productVariant.name,
            quantity: orderLine.quantity,
            price: orderLine.unitPriceWithTax / 100,
            image:
              process.env.ECOMMERCE_SERVER_NAME +
              "/" +
              "assets" +
              "/" +
              orderLine.featuredAsset.preview,
          };
        });
        const shiping = [
          {
            name: "Shipping price",
            quantity: 1,
            price: order.shippingWithTax / 100,
            image: "",
          },
        ];
        if (order.shippingLines[0].price == 0) {
          items = [...orderItems];
        } else {
          items = [...orderItems, ...shiping];
        }
        const nonceCode = this.generate(10);
        const currentDate = new Date();
        const futureDate = new Date(currentDate.getTime() + 15 * 60000);
        const expireDate = futureDate.toISOString().slice(0, 19);
        const customerPhoneNumber = order.shippingAddress.phoneNumber;
        const phoneNumberAsNumber: any = customerPhoneNumber!.replace(/ /g, "");

        const paymentInfo = {
          cancelUrl: "https://shop.afromerkato.com/",
          notifyUrl: "https://admin.afromerkato.com/arifpayments/arifpay",
          successUrl: "https://shop.afromerkato.com/checkout/thankyou",
          errorUrl: "https://shop.afromerkato.com/",
          paymentMethods: ["TELEBIRR", "CBE", "AMOLE"],
          expireDate: expireDate.toString,
          items: items,
          beneficiaries: [
            {
              accountNumber: "01320811436100",
              bank: "AWINETAA",
              amount: order.totalWithTax / 100,
            },
          ],
          nonce: nonceCode,
          lang: "EN",
          phone: phoneNumberAsNumber,
        };

        const response = await axios
          .post(url, paymentInfo, {
            headers: {
              "x-arifpay-key": process.env.ARIFPAY_KEY,
              "Content-Type": "application/json",
              Accepts: "application/json",
            },
          })
          .then(async (res) => {
            const arifpay = new Arifpay();
            arifpay.orderCode = order.code;
            arifpay.nonce = nonceCode;
            arifpay.sessionId = res.data.data.sessionId;
            await aripayRepo.save(arifpay);
            const returndata: ArifpayReturn = {
              error: res.data.error,
              msg: res.data.msg,
              data: {
                paymentUrl: res.data.data.paymentUrl,
                totalAmount: res.data.data.totalAmount,
              },
            };
            return returndata;
          })
          .catch((err) => {
            console.log(err);
            return err;
          });

        return response;
      }
    }
  }
}
