import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoginUser extends React.Component {

  state = {
    email: '',
    password: '',
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

          {this.state.email && this.state.password &&
          <button onClick={this.loginUser}>Log in</button>
          }
        </div>
      </div>
    )
  }

  loginUser = async () => {
    const { email, password } = this.state

    try {
      const response = await this.props.authenticateUserMutation({variables: { email, password }})
      localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
      window.location.reload()
    } catch (e) {
      console.error('An error occurred: ', e)
    }

  }

}

const AUTHENTICATE_EMAIL_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

export default graphql(AUTHENTICATE_EMAIL_USER, {name: 'authenticateUserMutation'})(LoginUser)
