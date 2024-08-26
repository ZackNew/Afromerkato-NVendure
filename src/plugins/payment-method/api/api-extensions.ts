import gql from "graphql-tag";

const commonApiExtensions = gql`
  input etSwitchQueryInputs {
    eOrderId: String!
    vOrderId: String!
  }

  input arifPayInput {
    orderCode: String
  }

  type data {
    paymentUrl: String!
    totalAmount: String!
  }

  type arifpayReturn {
    error: Boolean!
    msg: String!
    data: data
  }

  extend type Query {
    startETSwitchRequest(input: etSwitchQueryInputs): Success
  }
  extend type Mutation {
    payWithArifPay(input: arifPayInput): arifpayReturn
  }
`;
export const adminApiExtensions = gql`
  ${commonApiExtensions}
`;
export const shopApiExtensions = gql`
  ${commonApiExtensions}
`;
