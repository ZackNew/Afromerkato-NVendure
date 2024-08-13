import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  Allow,
  Ctx,
  Order,
  PaginatedList,
  ProductVariant,
  Refund,
  RequestContext,
  Transaction,
} from "@vendure/core";
import { RefundReportService } from "../services/refund-admin-api.service";
import { SalesReportService } from "../services/sales-admin-api.service";
import { StockReportService } from "../services/stock-admin-api.service";

@Resolver()
export class ReportAdminResolver {
  constructor(
    private refundReportService: RefundReportService,
    private salesReportService: SalesReportService,
    private stockReportService: StockReportService,
  ) {}

  @Query()
  async getCompletedOrder(
    @Ctx() ctx: RequestContext,
    @Args() args: any,
  ): Promise<PaginatedList<Order>> {
    return this.salesReportService.findAll(ctx, args.options || undefined);
  }

  @Query()
  async getRefundList(
    @Ctx() ctx: RequestContext,
    @Args() args: any,
  ): Promise<PaginatedList<Refund>> {
    return this.refundReportService.findAll(ctx, args.options || undefined);
  }

  @Query()
  async getStockList(
    @Ctx() ctx: RequestContext,
    @Args() args: any,
  ): Promise<PaginatedList<ProductVariant>> {
    return this.stockReportService.findAll(ctx, args.options || undefined);
  }
}
