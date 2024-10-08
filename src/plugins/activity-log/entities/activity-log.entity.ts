import {
  Administrator,
  Channel,
  ChannelAware,
  SoftDeletable,
  Translatable,
  Translation,
} from "@vendure/core";
import { DeepPartial } from "@vendure/common/lib/shared-types";
import { VendureEntity } from "@vendure/core";
import {
  Column,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  Index,
} from "typeorm";
import {
  CollectionRelatedActivityType,
  GroupChangeEventType,
  DefaultActivityType,
  OrderRelatedActivityType,
} from "../constants";

export abstract class ActivityLogEntity<T extends VendureEntity>
  extends VendureEntity
  implements ChannelAware, SoftDeletable, Translatable
{
  constructor(input?: DeepPartial<ActivityLogEntity<T>>) {
    super(input);
  }
  translations: Translation<VendureEntity>[];

  @DeleteDateColumn({ type: Date, nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @Column("varchar")
  type:
    | DefaultActivityType
    | OrderRelatedActivityType
    | CollectionRelatedActivityType
    | GroupChangeEventType;

  @Column({ type: "text" })
  description: string;

  @Column({ default: true })
  /**In the case of entities tracking multiple types like OrderRelatedEntityActivityLog,
   * multiple rows can be marked activityMadeTheCurrentChange, one for Order-Refund Pair and the other for Order-Fullfillment Pair */
  activityMadeTheCurrentContextualizedChange: boolean;

  @Column("simple-json")
  change?: any;

  @ManyToOne((type) => Administrator, {
    eager: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    nullable: true,
  })
  admin: Administrator;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
