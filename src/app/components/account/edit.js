import PropTypes from 'prop-types'
import Form from '../form'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getInstructions() {
    return {
      icon: 'map',
      title: 'Let\'s plan a college tour!',
      text: 'To begin, give your tour a memorable name like "Spring Break Tour" and indicate where you will begin and end your journey.'
    }
  }

  _getForm() {
    return {
      title: 'New Tour',
      method: 'PATCH',
      action: '/api/account',
      submitText: 'Save',
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
        { label: 'Email', name: 'email', type: 'textfield', required: true },
        { label: 'Date', name: 'date', type: 'datefield' },
        { label: 'Color', name: 'color', type: 'colorfield' },
        { label: 'Description', name: 'description', type: 'textarea' }
      ],
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Edit
