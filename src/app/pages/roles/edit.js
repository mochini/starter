import PropTypes from 'prop-types'
import Form from '../../components/form'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Role',
      method: 'PATCH',
      endpoint: `/api/roles/${id}`,
      action: `/api/roles/${id}`,
      submitText: 'Save',
      fields: [
        { label: 'Title', name: 'title', type: 'textfield', required: true },
        { label: 'Description', name: 'description', type: 'textarea', required: true }
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
