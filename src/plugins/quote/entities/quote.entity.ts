import {
  Entity,
  ManyToMany,
  Column,
  JoinTable,
  Generated,
  Index,
} from "typeorm";
import { DeepPartial, VendureEntity, ProductVariant } from "@vendure/core";

@Entity()
export class Quote extends VendureEntity {
  constructor(input?: DeepPartial<Quote>) {
    super(input);
  }
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 40 })
  fullName: string;

  @Column({ length: 40 })
  userEmail: string;

  @Column({ length: 15 })
  fromPhone: string;

  @Column({ length: 300, default: "" })
  assetUrl: string;

  @ManyToMany((type) => ProductVariant, { eager: true })
  @JoinTable({ name: "quote_product" })
  forProducts?: ProductVariant[];
}
