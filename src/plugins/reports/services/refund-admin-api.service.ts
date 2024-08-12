import { Injectable } from "@nestjs/common";
import {
  ChannelService,
  ID,
  ListQueryBuilder,
  ListQueryOptions,
  PaginatedList,
  Refund,
  RequestContext,
  TransactionalConnection,
  UserService,
} from "@vendure/core";

@Injectable()
export class RefundReportService {
  constructor(
    private connection: TransactionalConnection,
    private channelService: ChannelService,
    private readonly listQueryBuilder: ListQueryBuilder,
    private userService: UserService
  ) {}

  async findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Refund>
  ): Promise<PaginatedList<Refund>> {
    const result = await this.listQueryBuilder
      .build(Refund, options, {
        ctx,
        where: {
          state: "Settled",
        },
        orderBy: { createdAt: "DESC" },
      })
      .innerJoinAndSelect("refund.payment", "payment")
      .innerJoinAndSelect("payment.order", "order")
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));

    return result;
  }
}
