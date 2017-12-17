import React from 'react'
import SelectBook from './SelectBook'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListBook extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <ul>
        {this.props.data.User.books.map(
          book =>
            <li key={book.id}>
              <SelectBook book={book} loggedInUser={this.props.loggedInUser}/>
            </li>
        )}
      </ul>
    )
  }
}

const USER_BOOKS = gql`
  query getUserBooks($id:ID!) {
    User(id:$id) {
      books(orderBy: createdAt_DESC) {
        id
        title
        imageUrl
        description
      }
    }
  }
`

export default graphql(
  USER_BOOKS,
  {
    options: ({loggedInUser}) => ({ variables: { id: loggedInUser.id }})
  }
)(ListBook)
