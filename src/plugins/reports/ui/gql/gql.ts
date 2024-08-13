/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query getCompletedOrder($options:CompletedOrderListOptions) {\n    getCompletedOrder(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        code\n        state\n        active\n        orderPlacedAt\n        subTotal\n        subTotalWithTax\n        shipping\n        shippingWithTax\n        customerId\n        type\n        currencyCode\n        shippingAddress{\n          fullName\n        }\n      }\n      totalItems\n    }\n  }\n":
    types.GetCompletedOrderDocument,
  "\n  query getRefundList($options:RefundListOptions) {\n    getRefundList(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        items\n        shipping\n        adjustment\n        total \n        method\n        reason\n        state\n        transactionId\n        paymentId\n            \n      }\n      totalItems\n    }\n  }\n":
    types.GetRefundListDocument,
  "\n  query getStockList($options:StockNewListOptions) {\n    getStockList(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        sku\n        enabled\n        price\n        priceIncludesTax\n        stock\n        closingStock\n        stockOnHand\n      }\n      totalItems\n    }\n  }\n":
    types.GetStockListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getCompletedOrder($options:CompletedOrderListOptions) {\n    getCompletedOrder(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        code\n        state\n        active\n        orderPlacedAt\n        subTotal\n        subTotalWithTax\n        shipping\n        shippingWithTax\n        customerId\n        type\n        currencyCode\n        shippingAddress{\n          fullName\n        }\n      }\n      totalItems\n    }\n  }\n",
): (typeof documents)["\n  query getCompletedOrder($options:CompletedOrderListOptions) {\n    getCompletedOrder(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        code\n        state\n        active\n        orderPlacedAt\n        subTotal\n        subTotalWithTax\n        shipping\n        shippingWithTax\n        customerId\n        type\n        currencyCode\n        shippingAddress{\n          fullName\n        }\n      }\n      totalItems\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getRefundList($options:RefundListOptions) {\n    getRefundList(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        items\n        shipping\n        adjustment\n        total \n        method\n        reason\n        state\n        transactionId\n        paymentId\n            \n      }\n      totalItems\n    }\n  }\n",
): (typeof documents)["\n  query getRefundList($options:RefundListOptions) {\n    getRefundList(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        items\n        shipping\n        adjustment\n        total \n        method\n        reason\n        state\n        transactionId\n        paymentId\n            \n      }\n      totalItems\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getStockList($options:StockNewListOptions) {\n    getStockList(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        sku\n        enabled\n        price\n        priceIncludesTax\n        stock\n        closingStock\n        stockOnHand\n      }\n      totalItems\n    }\n  }\n",
): (typeof documents)["\n  query getStockList($options:StockNewListOptions) {\n    getStockList(options: $options) {\n      items {\n        id\n        createdAt\n        updatedAt\n        sku\n        enabled\n        price\n        priceIncludesTax\n        stock\n        closingStock\n        stockOnHand\n      }\n      totalItems\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
