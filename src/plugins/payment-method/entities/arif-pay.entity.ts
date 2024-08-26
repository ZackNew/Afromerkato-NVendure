import { DeepPartial, VendureEntity } from "@vendure/core";
import { Entity, Column,PrimaryGeneratedColumn } from "typeorm";

export enum ArifPaySessionStatus {
    SUCCESS = "Success",
    PENDING = "Pending",
    FAILED = "Failed",
    CANCELLED="cancelled"
  }

@Entity()
export class Arifpay extends VendureEntity {
  constructor(input?: DeepPartial<Arifpay>) {
    super(input);
  }

  @PrimaryGeneratedColumn()
  id:string

  @Column({ nullable: false })
  orderCode: string;

  @Column({ nullable: false })
  nonce: string;

  @Column({ nullable: false })
  sessionId: string;

  @Column({ nullable: false,default:ArifPaySessionStatus.PENDING})
  status: ArifPaySessionStatus;
}