import gql from "graphql-tag";
export const adminApiExtension = gql`
  type ShippingAddress {
    fullName: String
  }
  type CompletedOrder implements Node {
    id: ID!
    orderId: ID
    createdAt: DateTime
    updatedAt: DateTime
    code: String
    state: String
    active: String
    orderPlacedAt: DateTime
    subTotal: String
    subTotalWithTax: String
    shipping: String
    shippingWithTax: String
    customerId: String
    type: String
    currencyCode: String
    shippingAddress: ShippingAddress
  }

  type CompletedOrderList implements PaginatedList {
    items: [CompletedOrder!]!
    totalItems: Int!
  }

  # # Generated at run-time by Vendure
  input CompletedOrderListOptions

  type RefundNew implements Node {
    id: ID!
    createdAt: String
    updatedAt: String
    items: String
    shipping: String
    adjustment: String
    total: String
    method: String
    reason: String
    state: String
    transactionId: String
    paymentId: String
  }

  type RefundList implements PaginatedList {
    items: [RefundNew!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input RefundListOptions

  type StockNew implements Node {
    id: ID!
    createdAt: String
    updatedAt: String
    sku: String
    enabled: String
    price: String
    priceIncludesTax: String
    stock: String
    closingStock: String
    stockOnHand: String
  }

  type StockNewList implements PaginatedList {
    items: [StockNew!]!
    totalItems: Int!
  }

  # Generated at run-time by Vendure
  input StockNewListOptions

  extend type Query {
    getRefundList(options: RefundListOptions): RefundList!
    getCompletedOrder(options: CompletedOrderListOptions): CompletedOrderList!
    getStockList(options: StockNewListOptions): StockNewList!
  }
`;
const refundReportAdminApiExtensions = gql`
  extend type Query {
    myNewQuery(id: ID!): Boolean!
  }

  extend type Mutation {
    myNewMutation(id: ID!): Boolean!
  }
`;
