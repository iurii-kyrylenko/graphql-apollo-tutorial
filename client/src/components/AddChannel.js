import React from 'react'
import { gql, graphql } from 'react-apollo'
// import { channelsListQuery } from './ChannelList'

const options = (name) => ({
  variables: { name },
  // optimisticResponse: {
  //   addChannel: {
  //     __typename: 'Channel',
  //     name,
  //     id: -1
  //   }
  // },
  // update: (store, { data: { addChannel } }) => {
  //   const data = store.readQuery({ query: channelsListQuery })
  //   data.channels.push(addChannel)
  //   store.writeQuery({ query: channelsListQuery, data })
  // }
})

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      mutate(options(e.target.value))
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
