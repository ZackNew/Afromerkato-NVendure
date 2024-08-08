import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import {GetProductNameQuery, GetProductNameQueryVariables} from '../../generated-types'

import { GET_PRODUCT_NAME } from './product-reviews-resolver.graphql';

@Injectable()
export class ProductReviewsResolver implements Resolve<any> {
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot): any {
        return this.dataService
            .query<GetProductNameQuery, GetProductNameQueryVariables>(GET_PRODUCT_NAME, {
                id: route.paramMap.get('id') || '',
            })
            .mapSingle(data => data.product);
    }
}
