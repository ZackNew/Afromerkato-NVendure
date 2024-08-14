import { Args, Mutation, Resolver , Query} from '@nestjs/graphql';
import {
    Allow,
    Ctx,
    ID,
    PaginatedList,
    Permission,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../entities/quote.entity';
import {deleteQuotePermissionDefinition,updateQuotesPermissionDefinition} from '../permissions';



@Resolver()
export class QuoteAdminResolver {
    
    constructor(private quoteService: QuoteService,){}

    @Query()
    @Allow(Permission.Owner)
    async getQuotesForCustomer(@Ctx() ctx: RequestContext,@Args('email') email: string): Promise<String[]>{
        return await this.quoteService
        .customerQuotes(ctx, email);
    }

    @Query()
    async getQuote(@Ctx() ctx: RequestContext, @Args('id') id: string) : Promise<Quote | null>{
       return await this.quoteService.getQuote(ctx, id);
    }

    
    @Query()
    async getQuoteResponseLink(
        @Ctx() ctx:RequestContext,
        @Args('id') id: string
    ): Promise<string>{
        return await this.quoteService.downloadResponsePdf(ctx, id);
    }
    
    @Mutation()
    @Transaction()
    @Allow(deleteQuotePermissionDefinition.Permission)
    async deleteQuote(@Ctx() ctx: RequestContext, @Args('id') id: string): Promise<any>{
        return await this.quoteService.deleteQuote(ctx,id );
     }

   
    
    // @Mutation()
    // @Transaction()
    // @Allow(updateQuotesPermissionDefinition.Permission)
    // async regenerateQuote(@Ctx() ctx:RequestContext, 
    //   @Args('id') id: string): Promise<Quote>{
    //       return await this.quoteService.regenerateQuote(ctx, id);
    // }

    
    @Query()
    async quotes(
        @Ctx() ctx: RequestContext,
        @Args() args: any,
    ): Promise<PaginatedList<Quote>> {
        return this.quoteService.findAll(ctx, args.options || undefined);
    }

}