import { Injectable } from "@nestjs/common";
import { CronJob } from "cron";
import { CronExpression,SchedulerRegistry, Cron } from "@nestjs/schedule";
// import { EtSwitchQueryInputs, Success } from "../../generated-shop-types";
import axios from "axios";
import https from "https"; // Import the 'https' module
import {
  RequestContext,
  Product,
  TransactionalConnection,
  OrderService,
  Order,
  ConfigService,
  User,
  RequestContextService,
} from "@vendure/core";
import {
  EtSwitchJob,
  EtSwitchPaymentStatus,
} from "../entities/et-switch-job.entity";
import { EtSwitchQueryInputs, Success } from "../gql/generated";

@Injectable()
export class paymentMethodsServices {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private connection: TransactionalConnection,
    private orderService: OrderService,
    private configService: ConfigService,
    private requestContextService: RequestContextService
  ) {}
  async startETSwitchRequest(
    ctx: RequestContext,
    etSwitchQueryInputs: EtSwitchQueryInputs
  ): Promise<Success> {
    
    const etSwitchRepo = this.connection.getRepository(ctx, EtSwitchJob);
    const newjob = new EtSwitchJob({
      vOrderId: etSwitchQueryInputs.vOrderId,
      eOrderId: etSwitchQueryInputs.eOrderId,
    });

    const newEtSwitchReq = etSwitchRepo.create(newjob);
    etSwitchRepo.save(newEtSwitchReq);

    this.createDynamicJob(ctx, etSwitchQueryInputs);

    return { success: true };
  }

  private async checkEtSwitchStatus(
    ctx: RequestContext,
    etSwitchQueryInputs: EtSwitchQueryInputs
  ) {
    // get the job
    const etSwitchRepo =
      this.connection.rawConnection.getRepository(EtSwitchJob);
    const etJob = await etSwitchRepo.findOne({
      where: { eOrderId: etSwitchQueryInputs.eOrderId },
    });
    const currentDate = new Date();

    const timeDiff = this.timeDiffInMinutes(
      currentDate.toString(),
      etJob!.createdAt.toString()
    );

    if (timeDiff < 25) {
      axios
        .get(
          `https://epg.ethswitch.et:9443/epg/rest/getOrderStatus.do?userName=ETTechtest&password=ETTech123&orderId=${etSwitchQueryInputs.eOrderId}&language=en`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          }
        )
        .then(async (res) => {
          if (res.data.OrderStatus != 0) {
            // handle the status
            if (etJob) {
              if (res.data.OrderStatus === 1 || res.data.OrderStatus === 2) {
                etJob.status = EtSwitchPaymentStatus.SUCCESS;
                await etSwitchRepo.save(etJob);
                // update the order here
                const orderRepo =
                  this.connection.rawConnection.getRepository(Order);

                let order = await orderRepo.findOne({
                  where: { code: etSwitchQueryInputs.vOrderId },
                });

                await this.orderService.transitionToState(
                  ctx,
                  order!.id,
                  "ArrangingPayment"
                );

                await this.orderService.addPaymentToOrder(ctx, order!.id, {
                  metadata: `${res.data.authorizationResponseId}`,
                  method: "boa",
                });
              } else {
                etJob.status = EtSwitchPaymentStatus.FAILED;
                await etSwitchRepo.save(etJob);
              }
            }

            // Stop the job
            const job = this.schedulerRegistry.getCronJob(
              etSwitchQueryInputs.eOrderId
            );
            job.stop();
          } else {
            console.log(
              "Sending request to et switch for order:",
              etSwitchQueryInputs.vOrderId
            );
          }
        });
    } else {
      // Stop the job
      const job = this.schedulerRegistry.getCronJob(
        etSwitchQueryInputs.eOrderId
      );
      job.stop();
    }
  }

  private createDynamicJob(ctx: RequestContext, etSwitchQueryInputs: any) {
    const job = new CronJob(CronExpression.EVERY_MINUTE, async () => {
      this.checkEtSwitchStatus(ctx, etSwitchQueryInputs);
    });
    this.schedulerRegistry.addCronJob(
      etSwitchQueryInputs["input"].eOrderId,
      job
    );
    job.start();
  }

  @Cron(CronExpression.EVERY_SECOND, {
    name: "etSwitchJob",
  })
  startJobs() {
    // Start jobs that are pending when server starts
    this.startJobsOnServerInit();
    const job = this.schedulerRegistry.getCronJob("etSwitchJob");
    job.stop();
  }

  private async startJobsOnServerInit() {
    const etSwitchRepo =
      this.connection.rawConnection.getRepository(EtSwitchJob);
    const pendingJobs = await etSwitchRepo.findBy({
      status: EtSwitchPaymentStatus.PENDING,
    });
    if (pendingJobs.length) {
      const ctx = await this.getSuperAdminContext();
      pendingJobs.forEach((job) => {
        this.createDynamicJob(ctx, {
          input: {
            vOrderId: job.vOrderId,
            eOrderId: job.eOrderId,
          },
        });
      });
    }
  }

  private async getSuperAdminContext(): Promise<RequestContext> {
    const { superadminCredentials } = this.configService.authOptions;
    const userRepo = await this.connection.rawConnection.getRepository(User);
    const superAdminUser = await userRepo.findOne({
      where: { identifier: superadminCredentials.identifier },
    });
    return this.requestContextService.create({
      apiType: "shop",
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user: superAdminUser!,
    });
  }

  private timeDiffInMinutes(time1: string, time2: string): number {
    // Parse timestamps to Date objects
    const date1 = new Date(time1);
    const date2 = new Date(time2);
    date1.setHours(date1.getHours() + 3);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date1.getTime() - date2.getTime();

    // Convert milliseconds to minutes
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    return differenceInMinutes;
  }
}
