import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateUser extends React.Component {

  constructor(props) {
    super()

    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  render () {

    return (
      <div>
        <div>
          <input
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
          <input
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          {this.state.name && this.state.email && this.state.password &&
          <button onClick={this.createUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  createUser = async () => {
    const { email, password, name } = this.state

    try {
      const response = await this.props.signupUserMutation(
        {variables: {email, password, name}}
      )
      localStorage.setItem('graphcoolToken', response.data.signupUser.token)
      window.location.reload()
    } catch (e) {
      console.error('An error occurred: ', e)
    }

  }

}

const SIGNUP_EMAIL_USER = gql`
  mutation SignupUser($email: String!, $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

export default graphql(SIGNUP_EMAIL_USER, {name: 'signupUserMutation'})(CreateUser)
