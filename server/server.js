const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')
const pubsub = require('./pubsub')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { SubscriptionManager } = require('graphql-subscriptions')

const PORT = 4000

const app = express()

app.use('*', cors({ origin: 'http://localhost:3000' }))

// Latency simulation
// app.use((req, res, next) => { setTimeout(next, 1000) })

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}))

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`API endpoint: http://localhost:${PORT}/graphql`)
  console.log(`Graphiql tool: http://localhost:${PORT}/graphiql`)
  console.log(`API subscriptions endpoint: ws://localhost:${PORT}/subscriptions`)
})

const subscriptionManager = new SubscriptionManager({ schema, pubsub })

new SubscriptionServer({
  subscriptionManager
}, {
  server: server,
  path: '/subscriptions'
})
