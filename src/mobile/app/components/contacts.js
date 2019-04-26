import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static contextTypes = {
    app: PropTypes.object,
    message: PropTypes.object
  }

  static propTypes = {}

  _handleAllow = this._handleAllow.bind(this)
  _handleDeny = this._handleDeny.bind(this)
  _handleGetPermission = this._handleGetPermission.bind(this)
  _handleGetContacts = this._handleGetContacts.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    this._handleGetPermission()
  }

  recieve(action, data) {
    if(action === 'getPermission') this._handleGetPermission()
    if(action === 'getContacts') this._handleGetContacts()
  }

  _getMessage() {
    return {
      color: 'green',
      icon: 'id-card-o',
      title: 'Access Contact List',
      text: 'If you grant us access, we can invite people from your phone\'s contact list. If not, you can still invite them manually.',
      onAllow: this._handleAllow,
      onDeny: this._handleDeny
    }
  }

  _handleGetPermission() {
    const { store } = this.context.app
    store.getItem('contacts', (err, value) => {
      if(value === true) return
      return store.setItem('contacts', true, (err, value) => {
        const message = this._getMessage()
        this.context.message.set(message)
      })
    })
  }

  _handleAllow() {
    navigator.contacts.find(['*'], (contacts) => {
      this.context.message.clear()
      this.context.app.send('contacts', 'getPermission', 'granted')
    }, (err) => {
      this.context.message.clear()
      this.context.app.send('contacts','getPermission', 'denied')
    }, {
      desiredFields: [],
      filter: '',
      hasPhoneNumber: false,
      multiple: true
    })
  }

  _handleDeny() {
    this.context.message.clear()
  }

  _handleGetContacts() {
    navigator.contacts.find(['*'], (contacts) => {
      this.app.send('contacts', 'getContacts', contacts)
    }, (err) => {})
  }

}

export default Contacts
