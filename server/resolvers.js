const pubsub = require('./pubsub')

const channels = [
  {
    id: 1,
    name: 'Channel #1'
  },
  {
    id: 2,
    name: 'Channel #2'
  }
]

let nextId = 3

const resolvers = {
  Query: {
    channels: () => channels
  },
  Mutation: {
    addChannel (obj, { name }) {
      const channel = { id: nextId++, name }
      channels.push(channel)
      pubsub.publish('channelAdded', channel)
      return channel
    }
  },
  Subscription: {
    channelAdded (channel) {
      console.log(channel)
      return channel
    }
  }
}

module.exports = resolvers
