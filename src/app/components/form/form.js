import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Field from './field'
import React from 'react'
import _ from 'lodash'

class Form extends React.PureComponent {

  static childContextTypes = {
    form: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    action: PropTypes.string,
    cancelText: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    instructions: PropTypes.any,
    method: PropTypes.string,
    panel: PropTypes.any,
    status: PropTypes.string,
    submitText: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onFetch: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onSave: PropTypes.func,
    onSetData: PropTypes.func,
    onSetReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  static defaultProps = {
    cancelText: 'Cancel',
    submitText: 'Submit',
    fields: [],
    title: ''
  }

  state = {
    panel: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush =  this._handlePush.bind(this)
  _handleSetReady = this._handleSetReady.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { panel } = this.state
    const { fields, instructions, status } = this.props
    return (
      <div className={ this._getContainerClass() }>
        <ModalPanel { ...this._getModalPanel() }>
          { instructions &&
            <div className="form-instructions">
              { instructions }
            </div>
          }
          <div className={ this._getFormClass() } ref={ node => this.form = node }>
            { status === 'loaded' && fields.map((field, index) => (
              <Field key={`field_${index}`} { ...this._getField(field, index) } />
            )) }
          </div>
        </ModalPanel>
        <CSSTransition key="form-panel" in={ this.props.panel !== null } classNames="translatex" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="form-panel">
            { _.isFunction(panel) ? React.createElement(panel) : panel }
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    const { endpoint, onFetch, onSetData } = this.props
    if(endpoint) return onFetch(endpoint)
    onSetData({})
  }

  componentDidUpdate(prevProps, prevState) {
    const { entity, panel, status } = this.props
    if(panel !== prevProps.panel) {
      const timeout = prevProps.panel ? 500 : 0
      setTimeout(() => this.setState({ panel }), timeout)
    }
    if(status !== prevProps.status) {
      if(status === 'saved') {
        this._handleSuccess(entity)
      }
    }
  }

  getChildContext() {
    return {
      form: {
        push: this._handlePush,
        pop: this._handlePop
      }
    }
  }

  _getField(field, index) {
    const { data, errors } = this.props
    return {
      data,
      errors,
      field,
      onChange: this._handleChange,
      onReady: this._handleSetReady
    }
  }

  _getFormClass() {
    const classes = ['ui','form']
    return classes.join(' ')
  }

  _getContainerClass() {
    const { className } = this.props
    const classes = ['form-container']
    if(className) classes.push(className)
    return classes.join(' ')
  }

  _getModalPanel() {
    const { title, cancelText, submitText } = this.props
    return {
      title,
      leftItems: [
        { label: cancelText, handler: this._handleCancel }
      ],
      rightItems: [
        { label: submitText, handler: this._handleSubmit }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(key, value) {
    this.props.onUpdateData(key, value)
  }

  _handlePop(num = 1) {
    this.props.onPop(num)
  }

  _handlePush(component) {
    this.props.onPush(component)
  }

  _handleSetReady(key) {
    this.props.onSetReady(key)
  }

  _handleSubmit() {
    const { action, data, method } = this.props
    this.props.onSave(method, action, data)
  }

  _handleSuccess(entity) {
    this.props.onSuccess(entity)
  }

}

export default Form
