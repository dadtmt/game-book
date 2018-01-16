import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withLoading from '../../hoc/withLoading'

const EditBook = ({ match, data }) => (
  <div>
    Edit Book {match.params.id}
    <h1>{data.Book.title}</h1>
  </div>
)

const GET_BOOK = gql`
  query GetBook($bookId: ID!) {
    Book(id: $bookId) {
      title
      description
      imageUrl
    }
  }
`

export default graphql(GET_BOOK, {
  options: ({ match }) => ({ variables: { bookId: match.params.id } })
})(withLoading(EditBook))
