import {
  AdministratorService,
  EventBus,
  ProductEvent,
  TransactionalConnection,
  Transaction,
  Ctx,
  RequestContext,
  ID,
  ProductService,
  Product,
  UserService,
  ProcessContext,
  ProductOptionGroupChangeEvent,
  ProductVariantEvent,
  Administrator,
} from "@vendure/core";
import {
  Injectable,
  OnApplicationBootstrap,
  NotImplementedException,
} from "@nestjs/common";
import { ProductRelatedActivityLogEntity } from "../entities/product-related-activity-log.entity";
import { ActivityLogService } from "./activity-log.service";
import { ActivityLog, ActivityLogFilter } from "../gql/generated";
import { default as dayjs } from "dayjs";
@Injectable()
export class ProductRelatedActivityLogService
  extends ActivityLogService<
    ProductEvent | ProductOptionGroupChangeEvent | ProductVariantEvent
  >
  implements OnApplicationBootstrap
{
  async deleteActivityLog(ctx: RequestContext, id: ID): Promise<Boolean> {
    let repo = this.transactionalConnection.getRepository(
      ctx,
      ProductRelatedActivityLogEntity,
    );
    await repo.softDelete(id);
    return true;
  }

  constructor(
    private eventBus: EventBus,
    private processContext: ProcessContext,
    private adminService: AdministratorService,
    private transactionalConnection: TransactionalConnection,
  ) {
    super();
  }

  @Transaction()
  async registerLog(
    event: ProductEvent | ProductOptionGroupChangeEvent | ProductVariantEvent,
  ) {
    let repo = this.transactionalConnection.getRepository(
      event.ctx,
      ProductRelatedActivityLogEntity,
    );
    let log = new ProductRelatedActivityLogEntity();
    if (event.ctx.apiType === "admin") {
      const adminRepo = this.transactionalConnection.getRepository(
        event.ctx,
        Administrator,
      );
      const currentAdmin = await adminRepo.findOne({
        where: { user: { id: event.ctx.activeUserId } },
        // select:['id', 'firstName', 'lastName','user']
      });
      log.admin = currentAdmin!;
      if (event instanceof ProductEvent) {
        log.entity = event.entity;
        if (event.type === "created" || event.type === "deleted") {
          log.change = { id: event.entity.id };
          if (event.type === "created") {
            log.description = `
                            <a href="./catalog/products/${event.entity.id}">
                                ${event.entity.translations[0].name}
                            </a> was
                            created by 
                            <a href="./settings/administrators/${currentAdmin!.id}">
                                ${currentAdmin!.firstName} ${currentAdmin!.lastName}
                            </a>
                        `;
          } else {
            log.description = `${event.entity.translations[0].name} was deleted by 
                            <a href="./settings/administrators/${currentAdmin!.id}">
                                ${currentAdmin!.firstName} ${currentAdmin!.lastName}
                            </a>
                        `;
          }
        } else {
          let recentChange = event.input;
          log.change = recentChange;
          log.description = `
                    <a href="./catalog/products/${event.entity.id}">
                        ${event.entity.translations[0].name} 
                    </a> was 
                    updated by 
                    <a href="./settings/administrators/${currentAdmin!.id}">
                         ${currentAdmin!.firstName} ${currentAdmin!.lastName}
                    </a>
                    `;
        }
      } else if (event instanceof ProductOptionGroupChangeEvent) {
        log.entity = event.product;
        log.change = { optionGroupId: event.optionGroupId };
        log.description = `
                <a href="./settings/administrators/${currentAdmin!.id}">
                     ${currentAdmin!.firstName} ${currentAdmin!.lastName}
                </a> ${event.type} option group ${event.type === "assigned" ? "to" : "from"}
                <a href="./catalog/products/${event.product.id}">
                    ${event.product.translations[0].name} 
                </a>.
                `;
      } else if (event instanceof ProductVariantEvent) {
        // log.entity= event.entity;
        log.change = event.input;
        log.description = `
                    <a href="./settings/administrators/${currentAdmin!.id}">
                            ${currentAdmin!.firstName} ${currentAdmin!.lastName}
                    </a>
                    ${event.type} variants 
                    ${event.entity.map((n) => n.name)}
                    
                `;
      } else {
        console.log("this shouldnt happen");
      }
      log.createdAt = event.createdAt;
      log.type = event.type;
      // log.entity= event.entity;
      await repo.save(log);
    } else if (event.ctx.apiType === "shop") {
      //all the changes regarding this product need to be marked expired
      console.log(`all changes for product createdAt ${event.createdAt} need to marked 
           activityMadeTheCurrentContextualizedChange=false because change came from shop-api`);
    } else {
      console.log(`unidentified api`);
    }
  }

  async activityLogs(
    ctx: RequestContext,
    filter?: ActivityLogFilter,
  ): Promise<ActivityLog[]> {
    let allLogsSelectQueryBuilder = await this.transactionalConnection
      .getRepository(ctx, ProductRelatedActivityLogEntity)
      .createQueryBuilder("log")
      .innerJoin("log.admin", "admin")
      .andWhere(`log.deletedAt IS NULL`)
      .orderBy("log.createdAt", "DESC");
    allLogsSelectQueryBuilder = this.addFilterToQueryBuilder(
      allLogsSelectQueryBuilder,
      filter,
    );
    const allLogs = await allLogsSelectQueryBuilder.getMany();
    let readableLogs: ActivityLog[] = [];
    for (let log of allLogs) {
      readableLogs.push({
        id: log.id.toString(),
        description: log.description,
        latest: false, //log.latestChange,
        dateTime: log.updatedAt,
      });
    }
    return readableLogs;
  }

  async revertChanges(ctx: RequestContext, id: ID): Promise<Boolean> {
    throw new NotImplementedException();
  }

  onApplicationBootstrap() {
    if (this.processContext.isServer) {
      this.eventBus.ofType(ProductEvent).subscribe(async (event) => {
        // console.log('event happened here')
        await this.registerLog(event);
      });
      this.eventBus
        .ofType(ProductOptionGroupChangeEvent)
        .subscribe(async (event) => {
          // console.log('event happened here')
          await this.registerLog(event);
        });
      this.eventBus.ofType(ProductVariantEvent).subscribe(async (event) => {
        // console.log('event happened here')
        await this.registerLog(event);
      });
    }
  }
}
