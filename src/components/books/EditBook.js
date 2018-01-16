import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import withLoading from '../../hoc/withLoading'

class EditBook extends React.Component {

  render () {
    return (
      <div>
        Edit Book {this.props.match.params.id}
        <h1>{this.props.data.Book.title}</h1>
      </div>
    )
  }
}

const GET_BOOK = gql`
  query GetBook($bookId: ID!){
    Book(id: $bookId){
      title
      description
      imageUrl
    }
  }
`

export default graphql(
  GET_BOOK,
  {
    options: ({match}) => ({ variables: { bookId: match.params.id }})
  }
)(withLoading(EditBook))
