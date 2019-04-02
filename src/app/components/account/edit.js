import PropTypes from 'prop-types'
import Form from '../form'
import React from 'react'

class Edit extends React.PureComponent {

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
        { label: 'Description', name: 'description', type: 'textarea' },
        { label: 'Number', name: 'number', type: 'numberfield' },
        { label: 'Phone', name: 'phone', type: 'phonefield' },
        { label: 'Email', name: 'email', type: 'emailfield' },
        { label: 'Money', name: 'money', type: 'moneyfield' },
        { label: 'Time', name: 'time', type: 'timefield' },
        { label: 'Select', name: 'select', type: 'select' },
        { label: 'Video', name: 'video', type: 'videofield' },
        { label: 'Dropdown', name: 'dropdown', type: 'dropdown', options: [{value:1,text:'One'}] }
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
