import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static contextTypes = {
    app: PropTypes.object,
    message: PropTypes.object
  }

  static propTypes = {}

  _handleDeny = this._handleDeny.bind(this)
  _handleGetContacts = this._handleGetContacts.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    document.addEventListener('message', this._handleRecieve, false)
  }

  _getMessage() {
    return {
      color: 'green',
      icon: 'id-card-o',
      title: 'Access Contact List',
      text: 'If you grant us access, we can invite people from your phone\'s contact list. If not, you can still invite them manually.',
      onAllow: this._handleGetContacts,
      onDeny: this._handleDeny
    }
  }

  _handleGetContacts() {
    const { app, message } = this.context
    const { store } = app
    store.getItem('contacts', (err, value) => {
      if(value !== true) {
        return store.setItem('contacts', true, (err, value) => {
          message.set(this._getMessage())
        })
      }
      navigator.contacts.find(['*'], (contacts) => {
        message.clear()
        app.send('contacts', 'getContacts', contacts)
      }, (err) => {
        message.clear()
        console.log(err)
      }, {
        desiredFields: [],
        filter: '',
        hasPhoneNumber: false,
        multiple: true
      })
    })
  }

  _handleDeny() {
    this.context.message.clear()
  }

  _handleRecieve(service, action, data) {
    if(service !== 'contacts') return
    if(action === 'get') this._handleGetContacts()
  }

}

export default Contacts
