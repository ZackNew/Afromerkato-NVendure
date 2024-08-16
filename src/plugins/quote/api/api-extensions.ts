import gql from "graphql-tag";

const commonApiExtensions = gql`
  type QuoteType {
    id: ID!
    fullName: String!
    userEmail: String!
    fromPhone: String!
    forProducts: [ProductVariant]
    createdAt: DateTime!
    uuid: String
    assetUrl: String
  }

  input QuoteInputType {
    fullName: String
    userEmail: String
    fromPhone: String!
    productIds: [String]
  }
  extend type Query {
    getQueryOf(email: String!): [QuoteType]
  }
  extend type Mutation {
    writeQuote(args: QuoteInputType!): QuoteType!
  }
`;
export const adminApiExtensions = gql`
  ${commonApiExtensions}

  type Quote implements Node {
    id: ID!
    fullName: String!
    userEmail: String!
    fromPhone: String!
    forProducts: [ProductVariant]
    createdAt: DateTime!
    uuid: String
    assetUrl: String
  }

  type QuoteList implements PaginatedList {
    items: [Quote!]!
    totalItems: Int!
  }
  # Generated at run-time by Vendure
  input QuoteListOptions

  extend type Query {
    getQuotesForCustomer(email: String!): [String]
    getQuote(id: ID!): QuoteType
    # getAllQuotes(filter: QuoteFilter): [QuoteType!]
    getQuoteResponseLink(id: ID!): String!
    quotes(options: QuoteListOptions): QuoteList!
  }

  extend type Mutation {
    deleteQuote(id: ID!): QuoteType
  }
`;

export const shopApiExtensions = gql`
  ${commonApiExtensions}
`;
