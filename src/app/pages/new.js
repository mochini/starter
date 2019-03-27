import Message from '../components/message'
import Form from '../components/form'
import PropTypes from 'prop-types'
import React from 'react'

class New extends React.Component {

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
      instructions: <Message { ...this._getInstructions() } />,
      method: 'POST',
      action: '/api/tours',
      submitText: 'Create',
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Name to uniquely identify this tour' }
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
