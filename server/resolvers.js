const channels = [
  {
    id: '1',
    name: 'Channel #1'
  },
  {
    id: '2',
    name: 'Channel #2'
  }
]

const resolvers = {
  Query: {
    channels: () => channels
  }
}

module.exports = resolvers
