import React, { Component } from 'react';

import CreateUser from './components/sign/CreateUser'
import LoginUser from './components/sign/LoginUser'
import CreateBook from './components/books/CreateBook'
import ListBook from './components/books/ListBook'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import logo from './logo.svg';
import './App.css';

class App extends Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _isLoggedIn = () => {
    return this.props.data.loggedInUser && this.props.data.loggedInUser.id !== ''
  }

  render() {

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to GameBook</h1>
        </header>
        <p className="App-intro">
          Make GameBook great again
        </p>
        { this._isLoggedIn() ? (
          <div>
            <p>Logged in as {this.props.data.loggedInUser.name}</p>
            <button onClick={this._logout}>Log out</button>
            <CreateBook loggedInUser={this.props.data.loggedInUser} />
            <ListBook loggedInUser={this.props.data.loggedInUser} />
          </div>
        ) : (
          <div>
            <CreateUser />
            <p>or</p>
            <LoginUser />
          </div>
        )}
      </div>
    );
  }
}

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
      name
    }
  }
`

export default graphql(LOGGED_IN_USER, { options: {fetchPolicy: 'network-only'}})(App)
