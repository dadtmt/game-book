import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateBook extends React.Component {
  state = {
    title: '',
    description: '',
    imageUrl: ''
  }

  render() {
    return (
      <div>
        <label>Create a new book: </label>
        <input
          value={this.state.title}
          placeholder="Title"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          value={this.state.description}
          placeholder="Description"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <input
          value={this.state.imageUrl}
          placeholder="Image Url"
          onChange={e => this.setState({ imageUrl: e.target.value })}
        />
        {this.state.imageUrl && <img src={this.state.imageUrl} alt="current" />}
        <button onClick={this.handleCreateBook}>New Book</button>
      </div>
    )
  }

  handleCreateBook = async () => {
    const loggedInUser = this.props.loggedInUser

    // redirect if no user is logged in
    if (!loggedInUser) {
      console.warn('Only logged in users can create new posts')
      return
    }

    const { title, description, imageUrl } = this.state
    const authorId = loggedInUser.id

    await this.props.CreateBookMutation({
      variables: { title, description, imageUrl, authorId }
    })
  }
}

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $imageUrl: String
    $authorId: ID!
  ) {
    createBook(
      title: $title
      description: $description
      imageUrl: $imageUrl
      authorId: $authorId
    ) {
      id
    }
  }
`

export default graphql(CREATE_BOOK, { name: 'CreateBookMutation' })(CreateBook)
