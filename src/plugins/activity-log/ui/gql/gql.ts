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
  "\n  fragment ActivityLogFragment on ActivityLog {\n    id\n    description\n    latest\n    dateTime\n  }\n":
    types.ActivityLogFragmentFragmentDoc,
  "\n  fragment AdministratorFragment on Administrator {\n    id\ncreatedAt\nupdatedAt\nfirstName\nlastName\nemailAddress\nuser{\nid\ncreatedAt\nupdatedAt\nidentifier\nverified\nlastLogin\ncustomFields\n}\ncustomFields\n  }\n":
    types.AdministratorFragmentFragmentDoc,
  "\n  query GetProductActivityLogs($filter: ActivityLogFilter) {\n    productActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetProductActivityLogsDocument,
  "\n  mutation RevertProductChanges($id: ID!) {\n    revertProductChanges(id: $id)\n  }\n":
    types.RevertProductChangesDocument,
  "\n  mutation DeleteProductActivityLog($id: ID!) {\n    deleteProductActivityLog(id: $id)\n  }\n":
    types.DeleteProductActivityLogDocument,
  "\n  query GetOrderRelatedActivityLogs($filter: ActivityLogFilter) {\n    orderRelatedActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetOrderRelatedActivityLogsDocument,
  "\n  mutation RevertOrderRelatedChanges($id: ID!) {\n    revertOrderRelatedChanges(id: $id)\n  }\n":
    types.RevertOrderRelatedChangesDocument,
  "\n  mutation DeleteOrderRelatedActivityLog($id: ID!) {\n    deleteOrderRelatedActivityLog(id: $id)\n  }\n":
    types.DeleteOrderRelatedActivityLogDocument,
  "\n  query GetCollectionActivityLogs($filter: ActivityLogFilter) {\n    collectionActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetCollectionActivityLogsDocument,
  "\n  mutation RevertCollectionChanges($id: ID!) {\n    revertCollectionChanges(id: $id)\n  }\n":
    types.RevertCollectionChangesDocument,
  "\n  mutation DeleteCollectionActivityLog($id: ID!) {\n    deleteCollectionActivityLog(id: $id)\n  }\n":
    types.DeleteCollectionActivityLogDocument,
  "\n  query GetIndustryActivityLogs($filter: ActivityLogFilter) {\n    industryActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetIndustryActivityLogsDocument,
  "\n  mutation RevertIndustryChanges($id: ID!) {\n    revertIndustryChanges(id: $id)\n  }\n":
    types.RevertIndustryChangesDocument,
  "\n  mutation DeleteIndustryActivityLog($id: ID!) {\n    deleteIndustryActivityLog(id: $id)\n  }\n":
    types.DeleteIndustryActivityLogDocument,
  "\n  query GetBrandActivityLogs($filter: ActivityLogFilter) {\n    brandActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetBrandActivityLogsDocument,
  "\n  mutation RevertBrandChanges($id: ID!) {\n    revertBrandChanges(id: $id)\n  }\n":
    types.RevertBrandChangesDocument,
  "\n  mutation DeleteBrandActivityLog($id: ID!) {\n    deleteBrandActivityLog(id: $id)\n  }\n":
    types.DeleteBrandActivityLogDocument,
  "\n  query GetShippingMethodActivityLogs($filter: ActivityLogFilter) {\n    shippingMethodActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetShippingMethodActivityLogsDocument,
  "\n  mutation RevertShippingMethodChanges($id: ID!) {\n    revertShippingMethodChanges(id: $id)\n  }\n":
    types.RevertShippingMethodChangesDocument,
  "\n  mutation DeleteShippingMethodActivityLog($id: ID!) {\n    deleteShippingMethodActivityLog(id: $id)\n  }\n":
    types.DeleteShippingMethodActivityLogDocument,
  "\n  query GetPaymentMethodActivityLogs($filter: ActivityLogFilter) {\n    paymentMethodActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetPaymentMethodActivityLogsDocument,
  "\n  mutation RevertPaymentMethodChanges($id: ID!) {\n    revertPaymentMethodChanges(id: $id)\n  }\n":
    types.RevertPaymentMethodChangesDocument,
  "\n  mutation DeletePaymentMethodActivityLog($id: ID!) {\n    deletePaymentMethodActivityLog(id: $id)\n  }\n":
    types.DeletePaymentMethodActivityLogDocument,
  "\n  query GetCustomerRelatedActivityLogs($filter: ActivityLogFilter) {\n    customerRelatedActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetCustomerRelatedActivityLogsDocument,
  "\n  mutation RevertCustomerRelatedChanges($id: ID!) {\n    revertCustomerRelatedChanges(id: $id)\n  }\n":
    types.RevertCustomerRelatedChangesDocument,
  "\n  mutation DeleteCustomerRelatedActivityLog($id: ID!) {\n    deleteCustomerRelatedActivityLog(id: $id)\n  }\n":
    types.DeleteCustomerRelatedActivityLogDocument,
  "\n  query GetPriceListActivityLogs($filter: ActivityLogFilter) {\n    priceListActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n":
    types.GetPriceListActivityLogsDocument,
  "\n  mutation RevertPriceListChanges($id: ID!) {\n    revertPriceListChanges(id: $id)\n  }\n":
    types.RevertPriceListChangesDocument,
  "\n  mutation DeletePriceListActivityLog($id: ID!) {\n    deletePriceListActivityLog(id: $id)\n  }\n":
    types.DeletePriceListActivityLogDocument,
  "\n  query GetAdministrators($options: AdministratorListOptions) {\n    administrators(options: $options) {\n      items {\n        ...AdministratorFragment\n      }\n      totalItems\n    }\n  }\n  \n":
    types.GetAdministratorsDocument,
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
  source: "\n  fragment ActivityLogFragment on ActivityLog {\n    id\n    description\n    latest\n    dateTime\n  }\n",
): (typeof documents)["\n  fragment ActivityLogFragment on ActivityLog {\n    id\n    description\n    latest\n    dateTime\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AdministratorFragment on Administrator {\n    id\ncreatedAt\nupdatedAt\nfirstName\nlastName\nemailAddress\nuser{\nid\ncreatedAt\nupdatedAt\nidentifier\nverified\nlastLogin\ncustomFields\n}\ncustomFields\n  }\n",
): (typeof documents)["\n  fragment AdministratorFragment on Administrator {\n    id\ncreatedAt\nupdatedAt\nfirstName\nlastName\nemailAddress\nuser{\nid\ncreatedAt\nupdatedAt\nidentifier\nverified\nlastLogin\ncustomFields\n}\ncustomFields\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetProductActivityLogs($filter: ActivityLogFilter) {\n    productActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetProductActivityLogs($filter: ActivityLogFilter) {\n    productActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertProductChanges($id: ID!) {\n    revertProductChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertProductChanges($id: ID!) {\n    revertProductChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteProductActivityLog($id: ID!) {\n    deleteProductActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteProductActivityLog($id: ID!) {\n    deleteProductActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetOrderRelatedActivityLogs($filter: ActivityLogFilter) {\n    orderRelatedActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetOrderRelatedActivityLogs($filter: ActivityLogFilter) {\n    orderRelatedActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertOrderRelatedChanges($id: ID!) {\n    revertOrderRelatedChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertOrderRelatedChanges($id: ID!) {\n    revertOrderRelatedChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteOrderRelatedActivityLog($id: ID!) {\n    deleteOrderRelatedActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteOrderRelatedActivityLog($id: ID!) {\n    deleteOrderRelatedActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetCollectionActivityLogs($filter: ActivityLogFilter) {\n    collectionActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetCollectionActivityLogs($filter: ActivityLogFilter) {\n    collectionActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertCollectionChanges($id: ID!) {\n    revertCollectionChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertCollectionChanges($id: ID!) {\n    revertCollectionChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteCollectionActivityLog($id: ID!) {\n    deleteCollectionActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteCollectionActivityLog($id: ID!) {\n    deleteCollectionActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetIndustryActivityLogs($filter: ActivityLogFilter) {\n    industryActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetIndustryActivityLogs($filter: ActivityLogFilter) {\n    industryActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertIndustryChanges($id: ID!) {\n    revertIndustryChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertIndustryChanges($id: ID!) {\n    revertIndustryChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteIndustryActivityLog($id: ID!) {\n    deleteIndustryActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteIndustryActivityLog($id: ID!) {\n    deleteIndustryActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetBrandActivityLogs($filter: ActivityLogFilter) {\n    brandActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetBrandActivityLogs($filter: ActivityLogFilter) {\n    brandActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertBrandChanges($id: ID!) {\n    revertBrandChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertBrandChanges($id: ID!) {\n    revertBrandChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteBrandActivityLog($id: ID!) {\n    deleteBrandActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteBrandActivityLog($id: ID!) {\n    deleteBrandActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetShippingMethodActivityLogs($filter: ActivityLogFilter) {\n    shippingMethodActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetShippingMethodActivityLogs($filter: ActivityLogFilter) {\n    shippingMethodActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertShippingMethodChanges($id: ID!) {\n    revertShippingMethodChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertShippingMethodChanges($id: ID!) {\n    revertShippingMethodChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteShippingMethodActivityLog($id: ID!) {\n    deleteShippingMethodActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteShippingMethodActivityLog($id: ID!) {\n    deleteShippingMethodActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetPaymentMethodActivityLogs($filter: ActivityLogFilter) {\n    paymentMethodActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetPaymentMethodActivityLogs($filter: ActivityLogFilter) {\n    paymentMethodActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertPaymentMethodChanges($id: ID!) {\n    revertPaymentMethodChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertPaymentMethodChanges($id: ID!) {\n    revertPaymentMethodChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeletePaymentMethodActivityLog($id: ID!) {\n    deletePaymentMethodActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeletePaymentMethodActivityLog($id: ID!) {\n    deletePaymentMethodActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetCustomerRelatedActivityLogs($filter: ActivityLogFilter) {\n    customerRelatedActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetCustomerRelatedActivityLogs($filter: ActivityLogFilter) {\n    customerRelatedActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertCustomerRelatedChanges($id: ID!) {\n    revertCustomerRelatedChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertCustomerRelatedChanges($id: ID!) {\n    revertCustomerRelatedChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteCustomerRelatedActivityLog($id: ID!) {\n    deleteCustomerRelatedActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteCustomerRelatedActivityLog($id: ID!) {\n    deleteCustomerRelatedActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetPriceListActivityLogs($filter: ActivityLogFilter) {\n    priceListActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetPriceListActivityLogs($filter: ActivityLogFilter) {\n    priceListActivityLogs(filter: $filter) {\n      ...ActivityLogFragment\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RevertPriceListChanges($id: ID!) {\n    revertPriceListChanges(id: $id)\n  }\n",
): (typeof documents)["\n  mutation RevertPriceListChanges($id: ID!) {\n    revertPriceListChanges(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeletePriceListActivityLog($id: ID!) {\n    deletePriceListActivityLog(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeletePriceListActivityLog($id: ID!) {\n    deletePriceListActivityLog(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetAdministrators($options: AdministratorListOptions) {\n    administrators(options: $options) {\n      items {\n        ...AdministratorFragment\n      }\n      totalItems\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetAdministrators($options: AdministratorListOptions) {\n    administrators(options: $options) {\n      items {\n        ...AdministratorFragment\n      }\n      totalItems\n    }\n  }\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
