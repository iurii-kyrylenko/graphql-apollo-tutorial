import { makeExecutableSchema } from 'graphql-tools'

const typeDefs  = `
  type Channel {
    id: ID!
    name: String
  }

  type Query {
    channels: [Channel]
  }
`
export default makeExecutableSchema({ typeDefs })
