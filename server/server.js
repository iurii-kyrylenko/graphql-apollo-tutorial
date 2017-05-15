const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const app = express()
const schema = require('./schema')

app.use('*', cors({ origin: 'http://localhost:3000' }))
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(4000, () => {
  console.log("Server listening on port 4000")
})
