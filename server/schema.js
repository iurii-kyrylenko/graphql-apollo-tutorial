const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs  = `
  type Channel {
    id: ID!
    name: String
  }

  type Query {
    channels: [Channel]
  }

  type Mutation {
    addChannel(name: String!): Channel
  }

  type Subscription {
    channelAdded: Channel
  }
`
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
