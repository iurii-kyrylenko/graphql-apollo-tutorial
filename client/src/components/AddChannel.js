import React from 'react'
import { gql, graphql } from 'react-apollo'
import { channelsListQuery } from './ChannelListWithData'

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.persist() // http://cheng.logdown.com/posts/2016/03/23/672523
      mutate({
        refetchQueries: [{ query: channelsListQuery }],
        variables: { name: e.target.value }
      })
      .then(() => {
        e.target.value = ''        
      })
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
