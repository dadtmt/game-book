import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './App'
import EditBook from './components/books/EditBook'
import registerServiceWorker from './registerServiceWorker'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
})
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/book/:id" component={EditBook} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
