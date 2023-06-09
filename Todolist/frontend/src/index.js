import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client"
import { split } from "apollo-link"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from '@apollo/client/utilities'
import App from './App.js'
import reportWebVitals from './reportWebVitals.js'
import 'antd/dist/antd.css'
import UserContextProvider from './Context/user.js'
import TodoContextProvider from './Context/todo.js'

const url = new URL("/graphql", window.location.href)

//create http link:
const httpLink = new HttpLink({
  // uri: "http://localhost:5000/"
  uri: url.href
})

//create a websocket link:
const wsLink = new WebSocketLink({
  uri: url.href.replace("http", "ws"),
  options: { reconnect: true }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({}),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <TodoContextProvider>
        <App />  
      </TodoContextProvider>
    </UserContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
