import {
  RequestContext,
  OrderLine,
  TransactionalConnection,
  ID,
  CustomerGroupService,
  UserService,
  ChannelService,
  TaxRate,
  Order,
  ListQueryOptions,
  ListQueryBuilder,
  PaginatedList,
} from "@vendure/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SalesReportService {
  constructor(
    private connection: TransactionalConnection,
    private userService: UserService,
    private channelService: ChannelService,
    private customerGroupService: CustomerGroupService,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  async findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Order>
  ): Promise<PaginatedList<Order>> {
    try {
      if (!options?.filter?.state) {
        const result = await this.listQueryBuilder
          .build(Order, options, {
            ctx,
            orderBy: { createdAt: "DESC" },
          })
          .andWhere(
            "state = 'PaymentSettled' OR state = 'Shipped' OR state = 'Delivered'"
          )
          .getManyAndCount()
          .then(([items, totalItems]) => ({ items, totalItems }));
        return result;
      } else {
        const result = await this.listQueryBuilder
          .build(Order, options, {
            ctx,
            orderBy: { createdAt: "DESC" },
          })
          .getManyAndCount()
          .then(([items, totalItems]) => ({ items, totalItems }));
        return result;
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
  }
}
