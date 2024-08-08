import { Channel, ChannelService, Ctx, GlobalSettings, GlobalSettingsService, ListQueryBuilder, ListQueryOptions, OrderLine, Product, ProductVariant, ProductVariantService, 
  RequestContext, TransactionalConnection, UserService,ProductService, Relations, PaginatedList } from '@vendure/core';
import {Injectable} from '@nestjs/common';

@Injectable()
export class StockReportService{
    constructor(private connection: TransactionalConnection, 
      private userService: UserService,
      private globalSettingsService: GlobalSettingsService,
      private productVariantService: ProductVariantService,
      private listQueryBuilder: ListQueryBuilder,
      private productservice: ProductService
      ){
    }
  


    async getSoldAmountsSince(ctx: RequestContext,day:Date):Promise<any>{
      let mysqlDatetimeFormat= day.toJSON().slice(0, 19).replace('T', ' ');
      let soldSince= await this.connection.getRepository(ctx, OrderLine)
        .createQueryBuilder("orderLine")
        .innerJoin('orderLine.productVariant', 'productVariant', "productVariant.enabled AND productVariant.deletedAt IS NULL")
        .innerJoin('orderLine.order','order', `order.state='Delivered'`)
        .innerJoin('orderLine.items','orderItem')
        .select(['orderLine.productVariantId','orderLine.id'])
        .where(`orderItem.updatedAt > '${mysqlDatetimeFormat}'`)
        .addGroupBy('orderLine.id')
        .addSelect('count(orderItem.id) as order_items')
        .addGroupBy('orderLine.productVariantId')
        .getRawMany();
        let finalValue:any={}
        for(let data of soldSince){
          if(finalValue[data.productVariantId] == undefined || finalValue[data.productVariantId] == null){
            finalValue[data.productVariantId]= parseInt(data.order_items)
          }else{
            finalValue[data.productVariantId]+= parseInt(data.order_items)
          }
        }
        return finalValue;
    }


    async findAll(ctx: RequestContext, options?: ListQueryOptions<ProductVariant>): Promise<PaginatedList<ProductVariant>> {
      const result = await this.listQueryBuilder
       .build(ProductVariant,options,{
        where:{
          deletedAt:undefined
        }
       })
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
          return result;
            }
}