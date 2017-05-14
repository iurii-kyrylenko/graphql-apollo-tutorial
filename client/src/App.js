import React, { Component } from 'react';
import {
  ApolloClient,
  graphql,
  gql,
  ApolloProvider
} from 'react-apollo'

import { typeDefs } from './schema'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools'
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils'

import logo from './logo.svg';
import './App.css';

const schema = makeExecutableSchema({ typeDefs })
addMockFunctionsToSchema({ schema })
const networkInterface = mockNetworkInterfaceWithSchema({ schema })
const client = new ApolloClient({ networkInterface })

const ChannelsList = ({ data: {loading, error, channels }}) => {
   if (loading) {
     return <p>Loading ...</p>
   }
   if (error) {
     return <p>{error.message}</p>
   }
   return <ul>
     { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
   </ul>
 }

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`

const ChannelListWithData = graphql(channelsListQuery)(ChannelsList)

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;