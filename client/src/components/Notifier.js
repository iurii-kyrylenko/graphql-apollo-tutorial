import React from 'react'
import { gql, withApollo } from 'react-apollo'

const query = gql`
  subscription {
    channelAdded {
      id
      name
    }
  }
`

class Notifier extends React.Component {
  constructor (props) {
    super(props)
    this.state = null
    const self = this
    this.subscription = this.props.client
      .subscribe({ query })
      .subscribe({
        next (data) {
          self.setState(data)
        },
        error (err) {
          console.log('Error:', err)
        }
      })
  }

  render () {
    return (
      <div className="notifier">
        <pre>
          { this.state ? JSON.stringify(this.state, null, 2) : 'Notification' }
        </pre>
      </div>
    )
  }

  componentWillUnmount () {
    this.props.client.unsubscribe(this.subscription)
  }
}

export default withApollo(Notifier)