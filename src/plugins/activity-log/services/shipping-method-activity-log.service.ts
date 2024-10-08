import {
  AdministratorService,
  EventBus,
  TransactionalConnection,
  Transaction,
  RequestContext,
  ID,
  ProcessContext,
  ShippingMethodEvent,
  Administrator,
} from "@vendure/core";
import {
  Injectable,
  OnApplicationBootstrap,
  NotImplementedException,
} from "@nestjs/common";
import { ActivityLogService } from "./activity-log.service";
import { ActivityLog, ActivityLogFilter } from "../gql/generated";
import { ShippingMethodActivityLogEntity } from "../entities/shipping-method-activity-log.entity";
@Injectable()
export class ShippingMethodActivityLogService
  extends ActivityLogService<ShippingMethodEvent>
  implements OnApplicationBootstrap
{
  async deleteActivityLog(ctx: RequestContext, id: ID): Promise<Boolean> {
    const repo = this.transactionalConnection.getRepository(
      ctx,
      ShippingMethodActivityLogEntity,
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
  async registerLog(event: ShippingMethodEvent) {
    const repo = this.transactionalConnection.getRepository(
      event.ctx,
      ShippingMethodActivityLogEntity,
    );
    const log = new ShippingMethodActivityLogEntity();
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
      if (event.type === "created" || event.type === "deleted") {
        log.change = { id: event.entity.id };
        if (event.type === "created") {
          log.description = `
                        <a href="./settings/shipping-methods/${event.entity.id}">
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
        const recentChange = event.input;
        log.change = recentChange;
        log.description = `
                <a href="./settings/shipping-methods/${event.entity.id}">
                    ${event.entity.translations[0].name} 
                </a> was 
                updated by 
                <a href="./settings/administrators/${currentAdmin!.id}">
                     ${currentAdmin!.firstName} ${currentAdmin!.lastName}
                </a>
                `;
      }
      log.createdAt = event.createdAt;
      log.type = event.type;
      log.entity = event.entity;
      await repo.save(log);
    } else if (event.ctx.apiType === "shop") {
      //all the changes regarding this product need to be marked expired
      console.log(`all changes for shipping method createdAt ${event.createdAt} need to marked 
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
      .getRepository(ctx, ShippingMethodActivityLogEntity)
      .createQueryBuilder("log")
      .innerJoin("log.admin", "admin")
      .andWhere(`log.deletedAt IS NULL`)
      .orderBy("log.createdAt", "DESC");
    allLogsSelectQueryBuilder = this.addFilterToQueryBuilder(
      allLogsSelectQueryBuilder,
      filter,
    );
    const allLogs = await allLogsSelectQueryBuilder.getMany();
    const readableLogs: ActivityLog[] = [];
    for (const log of allLogs) {
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
      this.eventBus.ofType(ShippingMethodEvent).subscribe(async (event) => {
        // console.log('event happened here')
        await this.registerLog(event);
      });
    }
  }
}
