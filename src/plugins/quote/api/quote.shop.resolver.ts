import { Args, Mutation, Resolver , Query} from '@nestjs/graphql';
import {
    Ctx,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../entities/quote.entity';
import {QuoteInputType} from '../gql/generated';

@Resolver()
export class QuoteShopResolver {

    constructor(private quoteService: QuoteService,){}

    @Query()
    async getQueryOf(@Ctx() ctx: RequestContext,@Args('email') email: string): Promise<Quote[]>{
        return await this.quoteService.getQuotesOf(ctx,email);
    }
    @Mutation()
    @Transaction()
    async writeQuote(@Ctx() ctx: RequestContext, @Args('args') input:QuoteInputType): Promise<Quote>{
        return await this.quoteService
        .addQuote(ctx, input);
    }
}