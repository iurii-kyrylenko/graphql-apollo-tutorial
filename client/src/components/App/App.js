import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'
import './App.css'
import ChannelList from '../ChannelList'
import Notifier from '../Notifier'

const wsClient = new SubscriptionClient(
  'ws://localhost:4000/subscriptions', { reconnect: true })

let networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
})

networkInterface = addGraphQLSubscriptions(networkInterface, wsClient)

// Latency simulation
// networkInterface.use([{
//   applyMiddleware(req, next) { setTimeout(next, 1000) },
// }]);

const client = new ApolloClient({ networkInterface })

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <Notifier />
          <ChannelList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
