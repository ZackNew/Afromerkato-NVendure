import {
    ProductService,
    OrderService,
    RequestContext,
    TransactionalConnection,
    ProductVariantService,
    ProductVariant,
    AdministratorService,
    CustomerService,
    EventBus,
    Administrator,
    Order,
    Customer,
    ActiveOrderService,
    ListQueryOptions,
    PaginatedList,
    ListQueryBuilder,
  } from "@vendure/core";
  import { BadRequestException } from "@nestjs/common";
  import { Injectable } from "@nestjs/common";
  import { Quote } from "../entities/quote.entity";
  import { Condition, In } from "typeorm";
  //import { CompanyService } from "../../company-info/company.service";
  import * as fs from "fs";
import { QuoteInputType } from "../gql/generated";
 //  import {Type } from "../ui/generated-shop-types";
  
//   import { genPdfFromHtml } from "./pdf.generator";
//   import { CmsService } from "../../cms/service/cms.service";
//   import {QuoteInputType } from "../ui/generated-admin-types";
//   import { EmailService } from "../../addons/api/services/email.service";
  import * as cheerio from "cheerio";
  
  @Injectable()
  export class QuoteService {
    constructor(
      private productService: ProductService,
    //  private infoSvc: CompanyService,
    //  private cmsService: CmsService,
      private productVariantService: ProductVariantService,
      private transactionConnection: TransactionalConnection,
    //  private emailService: EmailService,
      private eventBus: EventBus,
      private activeOrderService: ActiveOrderService,
      private listQueryBuilder: ListQueryBuilder,
    ) {}
  
      // async approve(ctx:RequestContext, id: string, ): Promise<Quote>{
      //  try{
      //       let adminName: string = "--";
      //       let adminId = ctx.activeUserId;
      //       if(adminId){
      //       //   console.log(`Getting use by ${adminId}`);
      //       const adminRepo= this.transactionConnection.getRepository(ctx, Administrator);
      //       const admin= await adminRepo.findOne({where:{user:{id: ctx.activeUserId}},
      //            //  select:['firstName', 'lastName','id','user']
      //            });
      //        if(admin){
      //            adminName= admin.firstName+' '+admin.lastName;
      //        }
      //       //   console.log({adminName});
      //       }
      //       const repo = this.transactionConnection.getRepository(ctx, Quote);
      //       const quote = await repo.findOne({where:{id}});
      //       if(!quote.isApproved){
      //            quote.isApproved = true;
      //            quote.adminName = adminName;
      //           if(quote.isSpecial){
      //            try{
      //                 await this.emailService.sendMail(quote.fromEmail, 
      //                      "Quote Approved",
      //                      `<p>Dear Sir/Madam</p></br></br><p>We approved your quote request.You will be contacted by one of our team members</p> </br><p> Ethiolab</p></br></br>`);
      //                      return await repo.save(quote);
      //            }catch(e){
  
      //                 throw Error('Unabel to send email to customer');
      //            }
  
      //           }else{
      //            try{
      //                 await this.emailService.sendMail(quote.fromEmail, 
      //                      "Quote Approved",
      //                      `<p>Dear Sir/Madam</p></br><p>We approved your quote request</p> <a href='${process.env.ECOMMERCE_SERVER_NAME}${quote.assetUrl}'> Here</a> is the response for your requested quote.</br><p>EthioLab</p>`);
      //                      return await repo.save(quote);
      //            }catch(e){
  
      //                 throw Error('Unabel to send email to customer');
      //            }
      //           }   
                 
            
      //       }
      //       // return true;
      //  }catch(e){
      //       console.warn(e.message);
      //       // return false
      //  }
  
      // }
  
       async addQuote(ctx: RequestContext,input:QuoteInputType){
            const quote = new Quote()
            // quote.userEmail = input.userEmail;
            // quote.fromPhone = input.fromPhone;
            // quote.fullName = input.fullName;
            const repo= this.transactionConnection.getRepository(ctx,ProductVariant);
            let products: ProductVariant[] = (input.productIds) ? await repo.find({where: {id: In(input.productIds)}, 
            relations:['product']}) : [];
            quote.forProducts = products
           // quote.assetUrl= await this.writeResponsePdf(ctx, quote);   
            let savedQuote=await this.transactionConnection.getRepository(ctx,Quote).save(quote);
  
            // if(savedQuote){
            //    try{
            //           await this.emailService.sendMail(input.userEmail, 
            //                "Quote Recived",
            //                `<p>Dear Sir/Madam  </br></br>Thank you for your quote request.</br>
            //                You will be contacted by one of our team members </br> AfroMerkato</p>`);
            //      }catch(e){
            //           throw Error('Unabel to send email to customer');
            //      }
            // }
            
            return savedQuote
       }
       
       async getQuotesOf(ctx: RequestContext,email: string): Promise<Quote[]>{
            const repo = this.transactionConnection.getRepository(ctx, Quote);
            // console.log( `Getting from email: ${email}`)
            const quotes: Quote[] = await repo.find({ 
                 where:{
                      userEmail: email,
                
                 },
                 order:{createdAt:'DESC'}
            })
            return quotes;
       }
       
       async getQuote(ctx :RequestContext, id: string): Promise<Quote | null >{
            const repo = this.transactionConnection.getRepository(ctx, Quote);
            const quote = await repo.findOne({where: {id},relations: ['forProducts'],order:{createdAt:'DESC'}})
  
      return quote as Quote;
    }
  
    async deleteQuote(ctx: RequestContext, id: string): Promise<any> {
      const repo = this.transactionConnection.getRepository(ctx, Quote);
      const quote = await repo.findOne({ where: { id } });
      if (!quote) return;
      await repo.delete(quote.id);
      return quote;
    }
  
    // async writeResponsePdf(ctx: RequestContext, quote: Quote): Promise<string> {
    //   if (!quote) throw new BadRequestException("Error quote not found!");
    // //  const companyInfo = await this.infoSvc.getComapnyInfo(ctx);
  
    //   const json = (
    //     await (
    //       await this.cmsService.findOne(ctx, Type.POLICIES)
    //     ).content
    //   ).join(",");
  
    //   const conData = JSON.parse(json);
    //   //console.log({conData})
    //   const terms = (
    //     (conData as []).find(
    //       (data) => (data as { name: string }).name === "TERMS AND CONDITIONS"
    //     ) as { description: string }
    //   ).description;
    //   //this.cmsResolver. getCms(ctx, [Type.POLICIES])["TERMS AND CONDITIONS"]
    //   const products = [];
    //   //  quote.forProducts?.forEach( async product => {
    //   //console.warn("data ", await this.productVariantService.getProductForVariant(ctx, product as unknown as  ProductVariant))})
    //   let title = "";
    //   const specs = [];
    //   const accs = [];
    //   quote.forProducts?.forEach(async (product) => {
    //     // console.log('Variant Custom Fields ',  product.customFields)
    //     const acc = (product?.customFields as any).accessories;
    //     if (acc) accs.push(acc);
  
    //     const pro = await this.productVariantService.getProductForVariant(
    //       ctx,
    //       product
    //     );
    //     //console.log("ll#")
    //     //  console.log('product custom field', pro.customFields)
    //     specs.push({
    //       name: product.translations[0].name,
    //       descr: pro.translations[0].description,
    //       price:
    //         (product.productVariantPrices[0].price / 100).toString() + " ETB",
    //     });
    //     //  console.log('lspecs ', {specs})
    //   });
    //   //    console.log({accs})
  
    //   /// we get the accessory entities here
     
  
    //   let accEntities = [];
    //   let accIds = [];
  
    //   accs.forEach((acc) => {
    //     accIds = accIds.concat((acc as string).trim().split(","));
    //   });
    //   //    console.log(accIds);
    //   if (accIds.length)
    //     accEntities = await this.productService.findByIds(ctx, accIds);
     
    //   const temp = [];
    //   console.clear();
    //   for (let i = 0; i < accEntities.length; i++) {
    //     const entity = accEntities[i];
    //     if (!entity) continue;
    //     // console.log('test1', {entity})
    //     // const var
  
    //     const vars = await this.productVariantService.getVariantsByProductId(
    //       ctx,
    //       entity.id
    //     );
    //     // console.log('EntityID ', entity.id)
    //     // console.log('Entity', vars.items.length)
    //     entity.price = "--";
    //     if (vars.totalItems) {
    //       // console.log(vars.items[0], 'trans');
    //       const price = await this.productVariantService.hydratePriceFields(
    //         ctx,
    //         vars.items[0],
    //         "price"
    //       );
    //       const priceWithTax =
    //         await this.productVariantService.hydratePriceFields(
    //           ctx,
    //           vars.items[0],
    //           "priceWithTax"
    //         );
    //       entity.price = priceWithTax / 101 + " ETB";
    //     }
    //     temp.push(entity);
    //   }
  
    //   //    console.log({accEntities});
    //   //    console.log('--------------------')
    //   accEntities = temp;
    //   //    console.log({accEntities})
  
    //   /*await quote.forProducts?.forEach( async product => */
    //   for (let i = 0; i < quote.forProducts?.length; i++) {
    //     //console.log('loop', product)
    //     const product = quote.forProducts[i];
    //     title += product.translations[0].name + ",";
    //     const t = await this.productVariantService.getProductForVariant(
    //       ctx,
    //       product as unknown as ProductVariant
    //     );
    //     const pro = await this.productVariantService.getProductForVariant(
    //       ctx,
    //       product
    //     );
  
    //     products.push({
    //       id:product.id,
    //       sku: product.sku,
    //       name: product.translations[0].name,
    //       descr: this.htmlToPlainText(t.description),
    //       price:
    //         (product.productVariantPrices[0].price / 100).toString() + " ETB",
    //       priceWithTax:(product.priceWithTax / 100).toString() + " ETB",
    //     });
    //   }
    //   const infos = await this.infoSvc.getComapnyInfo(ctx);
    //   //console.warn("real product ", {products})
    //   const comm_bank = infos.commercial_bank;
    //   const dashen = infos.dashen_bank;
    //   const tele_birr = infos.tele_birr;
  
    //   const data = {
    //     access: accEntities,
    //     ref: quote.id,
    //     specs: specs,
    //     q_ref: quote.uuid,
    //     general_terms: terms,
    //     date: new Date().toDateString(),
    //     products,
    //     product_title: title,
    //     made_out_email: quote.userEmail,
    //     made_out_phone: quote.fromPhone,
    //     made_out_name:quote.fullName
    //   };
  
    //   return await genPdfFromHtml(data);
    // }
  
    htmlToPlainText(html: string): string {
      if (html) {
        const $ = cheerio.load(html.toString());
        // Extract text content from HTML using Cheerio
        const plainText = $("body").text();
        return plainText;
      }
  
      return "";
    }
  
    async downloadResponsePdf(ctx: RequestContext, id: string): Promise<string> {
      const repo = this.transactionConnection.getRepository(ctx, Quote);
      const quote = await repo.findOne({ where: { id } });
      if (quote && quote.assetUrl && quote.assetUrl !== "") {
        return quote.assetUrl;
      }
      return "";
    }
    // async myQuotes(ctx: RequestContext, filter: QuoteFilter): Promise<Quote[]> {
    //   const repo = this.transactionConnection.getRepository(ctx, Quote);
    //   let applyWhereClause: any = {};
    //   if (filter && filter.isApproved != undefined && filter.isApproved != null) {
    //     applyWhereClause = { ...applyWhereClause, isApproved: filter.isApproved };
    //   }
    //   if (filter && filter.isSeen != undefined && filter.isSeen != null) {
    //     applyWhereClause = { ...applyWhereClause, isseen: filter.isSeen };
    //   }
    //   return await repo.find({
    //     where: applyWhereClause,
    //     relations: ["forProducts"],
    //     order: {
    //       createdAt: "DESC",
    //     },
    //   });
    // }
  
    async customerQuotes(
      ctx: RequestContext,
      customerEmail: string
    ): Promise<String[]> {
      const quoteRepo = this.transactionConnection.getRepository(ctx, Quote);
      const customerRepo = this.transactionConnection.getRepository(
        ctx,
        Customer
      );
      if (ctx.activeUserId) {
        if (ctx.apiType == "shop") {
          let customer = await customerRepo.findOne({
            where: { user: { id: ctx.activeUserId } },
            select: ["emailAddress", "user"],
          });
          if (customer!.emailAddress !== customerEmail) {
            return [];
          }
        }
        return (
          await quoteRepo.find({
            where: {
              userEmail: customerEmail,
            },
          })
        ).map((item) => item.assetUrl);
      }
      return [];
    }
  
   
  
    // async regenerateQuote(ctx: RequestContext, id: string): Promise<Quote> {
    //   const repo = this.transactionConnection.getRepository(ctx, Quote);
    //   const quote = await repo.findOne({ where: { id: id } });
    //   // const prodrepo= this.transactionConnection.getRepository(ctx,ProductVariant);
    //   // let products: ProductVariant[] = (quote.forProducts) ? await prodrepo.find({where: {id: In(quote.forProducts)},
    //   // relations:['product']}) : [];
    //   // quote.forProducts = products
    //   let existingFileName: string;
    //   if (process.env.APP_ENV === "dev")
    //     existingFileName = `./static${quote.assetUrl}`;
    //   else existingFileName = `./dist/static${quote.assetUrl}`;
    //   quote.assetUrl = await this.writeResponsePdf(ctx, quote);
    //   quote.isApproved = false;
    //   fs.unlinkSync(existingFileName);
    //   return await repo.save(quote);
    // }
    
    async findAll(ctx: RequestContext, options?: ListQueryOptions<Quote>): Promise<PaginatedList<Quote>> {
      const [items, totalItems] = await this.listQueryBuilder
        .build(Quote, options, {ctx, orderBy: { createdAt: 'DESC' } })
        .getManyAndCount();
      return ({ items, totalItems });
  }
  }
  