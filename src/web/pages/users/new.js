import Form from '../../components/form'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.PureComponent {

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
      title: 'New User',
      method: 'POST',
      action: '/api/users',
      submitText: 'Save',
      fields: [
        { label: 'First Name', name: 'first_name', type: 'textfield', required: true },
        { label: 'Last Name', name: 'last_name', type: 'textfield', required: true },
        { label: 'Email', name: 'email', type: 'textfield', required: true },
        { label: 'Roles', name: 'role_ids', type: 'lookup', multiple: true, endpoint: '/api/roles', value: 'id', text: 'title' },
        { label: 'Photo', name: 'photo_id', type: 'filefield' }
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

export default New
