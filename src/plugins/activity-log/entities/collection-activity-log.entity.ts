import {
  Administrator,
  Asset,
  Channel,
  ChannelAware,
  Collection,
  HasCustomFields,
  Product,
  ProductVariant,
  SoftDeletable,
  Translatable,
  Translation,
} from "@vendure/core";
import { DeepPartial } from "@vendure/common/lib/shared-types";
import { VendureEntity } from "@vendure/core";
import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { ActivityLogEntity } from "./activity-log.entity";

@Entity()
export class CollectionActivityLogEntity
  extends ActivityLogEntity<Collection>
  implements ChannelAware, SoftDeletable, Translatable
{
  constructor(input?: DeepPartial<CollectionActivityLogEntity>) {
    super(input);
  }

  @ManyToOne((type) => Collection, {
    eager: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    nullable: true,
  })
  entity: Collection;

  @ManyToMany((type) => ProductVariant, {
    eager: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  variants: ProductVariant[];
}
