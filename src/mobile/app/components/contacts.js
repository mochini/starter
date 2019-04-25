class Contacts {

  constructor() {
  }

  recieve(action, data, callback) {
  }

  _handleGetPermission() {
    this.store.getItem('contacts', (err, value) => {
      if(value !== true) {
        return window.store.setItem('contacts', true, function (err, value) {
          this._handleSend('getContactsPermission', 'unknown')
        })
      }
      navigator.contacts.find(['*'], (contacts) => {
        this._handleSend('getContactsPermission', 'granted')
      }, (err) => {
        this._handleSend('getContactsPermission', 'denied')
      }, {
        desiredFields: [],
        filter: '',
        hasPhoneNumber: false,
        multiple: true
      })
    })
  }

}

export default Contacts
