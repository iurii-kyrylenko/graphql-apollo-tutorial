import React from 'react'
import { gql, graphql } from 'react-apollo'
import { channelsListQuery } from './ChannelListWithData'

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      mutate({
        variables: { name: e.target.value },
        optimisticResponse: {
          addChannel: {
            __typename: 'Channel',
            name: e.target.value,
            id: Math.floor(-10000 * Math.random())
          }
        },
        update: (store, { data: { addChannel } }) => {
          const data = store.readQuery({ query: channelsListQuery })
          data.channels.push(addChannel)
          store.writeQuery({ query: channelsListQuery, data })
        }
      })
      e.target.value = ''
    }
  }
  return (
    <input type="text" onKeyUp={ handleKeyUp } placeholder="New channel" />
  )
}

const addChannelMutation = gql`
  mutation addChannelMutation($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`
const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel)

export default AddChannelWithMutation
