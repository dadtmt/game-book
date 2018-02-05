import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withLoading from '../../hoc/withLoading'

import Page from './Page'

export const EditBook = ({ match, data }) => (
  <div>
    Edit Book {match.params.id}
    <h1>{data.Book.title}</h1>
    <div>
      <Page {...data.Book.firstPage} />
    </div>
  </div>
)

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    Book(id: $bookId) {
      title
      description
      imageUrl
      firstPage {
        title
        description
        imageUrl
      }
    }
  }
`

export default graphql(GET_BOOK, {
  options: ({ match }) => ({ variables: { bookId: match.params.id } })
})(withLoading(EditBook))
