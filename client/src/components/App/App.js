import React, { Component } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import './App.css'
import ChannelListWithData from '../ChannelList'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
})

// Latency simulation
networkInterface.use([{
  applyMiddleware(req, next) { setTimeout(next, 1000) },
}]);

const client = new ApolloClient({ networkInterface })

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <ChannelListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
