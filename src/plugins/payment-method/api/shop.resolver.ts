import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { Ctx, RequestContext } from "@vendure/core";
import { paymentMethodsServices } from "../services/paymentMethods.service";
import { ArifPayInput, ArifpayReturn, EtSwitchQueryInputs, Success } from "../gql/generated";
import { ArifPayServices } from "../services/arifpay.service";


@Resolver()
export class paymentApiResolver {
  constructor(private paymentMethodsServices:paymentMethodsServices,private arifpayService:ArifPayServices) {}

  @Query()
  startETSwitchRequest(
    @Ctx() Ctx: RequestContext,
    @Args() etSwitchQueryInputs: EtSwitchQueryInputs
  ): Promise<Success> {
    return this.paymentMethodsServices.startETSwitchRequest(
      Ctx,
      etSwitchQueryInputs
    );
  }

  @Mutation()
 async payWithArifPay(@Ctx() ctx:RequestContext,@Args() arifPayInput:ArifPayInput):Promise<any>{
    return await this.arifpayService.payWithArifPay(ctx,arifPayInput);
  }
 
}
