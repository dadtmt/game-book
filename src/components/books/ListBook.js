import React from 'react'
import SelectBook from './SelectBook'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withLoading from '../../hoc/withLoading'

export const ListBook = ({ data }) => (
  <ul>
    {data.User.books.map(book => (
      <li key={book.id}>
        <SelectBook {...book} />
      </li>
    ))}
  </ul>
)

const USER_BOOKS = gql`
  query getUserBooks($id: ID!) {
    User(id: $id) {
      books(orderBy: createdAt_DESC) {
        id
        title
        imageUrl
        description
      }
    }
  }
`

export default graphql(USER_BOOKS, {
  options: ({ loggedInUser }) => ({ variables: { id: loggedInUser.id } })
})(withLoading(ListBook))
