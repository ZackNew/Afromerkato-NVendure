import gql from 'graphql-tag';

export const GET_COMPLETEDORDER_LIST = gql`
  query getCompletedOrder($options:CompletedOrderListOptions) {
    getCompletedOrder(options: $options) {
      items {
        id
        createdAt
        updatedAt
        code
        state
        active
        orderPlacedAt
        subTotal
        subTotalWithTax
        shipping
        shippingWithTax
        customerId
        type
        currencyCode
        shippingAddress{
          fullName
        }
      }
      totalItems
    }
  }
`;

export const GET_REFUND_LIST = gql`
  query getRefundList($options:RefundListOptions) {
    getRefundList(options: $options) {
      items {
        id
        createdAt
        updatedAt
        items
        shipping
        adjustment
        total 
        method
        reason
        state
        transactionId
        paymentId
            
      }
      totalItems
    }
  }
`;

export const GET_STOCK_LIST = gql`
  query getStockList($options:StockNewListOptions) {
    getStockList(options: $options) {
      items {
        id
        createdAt
        updatedAt
        sku
        enabled
        price
        priceIncludesTax
        stock
        closingStock
        stockOnHand
      }
      totalItems
    }
  }
`;

