import React from 'react'
import { Link } from 'react-router-dom'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SelectBook extends React.Component {

  render () {
    return (
      <div>
        <Link to={"book/"+this.props.book.id}>Select this book link</Link>
        <button onClick={this.handleSelectBook}>Select this book</button>
        <h2>{this.props.book.title}</h2>
        { this.props.book.imageUrl && (
          <div
            style={{
              backgroundImage: `url(${this.props.book.imageUrl})`,
              backgroundSize: 'cover',
              paddingBottom: '100%',
            }}
          />
        ) }
        <div>
          {this.props.book.description}&nbsp;
        </div>
      </div>
    )
  }

  handleSelectBook = async () => {
    await this.props.SelectBookMutation({
      variables: {
        userId: this.props.loggedInUser.id,
        bookId: this.props.book.id
      }
    })
  }
}

const SELECT_BOOK = gql`
  mutation SelectBook($userId: ID!, $bookId: ID!){
    setSelectedBook(selectedByAuthorUserId: $userId, selectedBookId: $bookId) {
      selectedBook {
        title
      }
    }
  }
`

export default graphql(SELECT_BOOK, {name: 'SelectBookMutation'})(SelectBook)
