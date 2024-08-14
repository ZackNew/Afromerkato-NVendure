import { gql } from 'graphql-tag';

export const DELETE_QUOTE = gql`
  mutation DeleteQuote($id:ID!){
    deleteQuote(id: $id){
      assetUrl
    }
  }
`;

export const GET_QUOTES= gql`
query Quotes($options:QuoteListOptions) {
  quotes(options: $options) {
      items {
        id
        createdAt
        fullName
        userEmail
        fromPhone
        uuid
        forProducts{
          productId
          id
          createdAt
          sku
          name
          featuredAsset{
           preview
         }
         assets{
          preview
         }
          
        }
        assetUrl
      }
      totalItems
    }
  }
`;
