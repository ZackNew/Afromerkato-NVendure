import { DeepPartial } from "@vendure/common/lib/shared-types";
import { VendureEntity } from "@vendure/core";
import { Entity, Column } from "typeorm";

export enum EtSwitchPaymentStatus {
  SUCCESS = "Success",
  PENDING = "Pending",
  FAILED = "Failed",
}

@Entity()
export class EtSwitchJob extends VendureEntity {
  constructor(input?: DeepPartial<EtSwitchJob>) {
    super(input);
  }

  @Column({ nullable: false })
  eOrderId: string;

  @Column({ nullable: false })
  vOrderId: string;

  @Column({ nullable: false, default: EtSwitchPaymentStatus.PENDING })
  status: EtSwitchPaymentStatus;
}
