import React from 'react'
import { gql, graphql } from 'react-apollo'
import AddChannel from './AddChannel'

const document = gql`
  subscription {
    channelAdded {
      id
      name
    }
  }
`

class ChannelsList extends React.Component {

  constructor (props) {
    super(props)
    this.subscription = this.props.data.subscribeToMore({
      document,
      updateQuery (previousResult, { subscriptionData }) {
        const newChannel = subscriptionData.data.channelAdded
        return {
          channels: [...previousResult.channels, newChannel]
        }
      }
    })
  }

  componentWillUnmount () {
    this.subscription()
  }

  render () {
    const { data: { loading, error, channels } } = this.props
    if (loading) {
     return <p>Loading ...</p>
    }
    if (error) {
      return <p>{ error.message }</p>
    }
    return (
      <div className="channelsList">
        <AddChannel />
        { channels.map( ch =>
          (<div key={ ch.id } className={ 'channel ' + (ch.id < 0 ? 'optimistic' : '') }>{ ch.name }</div>)
        )}
      </div>
    )
  }
}

const channelsListQuery = gql`
  query channelsListQuery {
    channels {
      id
      name
    }
  }
`

const ChannelListWithData = graphql(channelsListQuery, {
  // options: { pollInterval: 5000 }
})(ChannelsList)

export { channelsListQuery }
export default ChannelListWithData
