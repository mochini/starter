import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import Token from '../../tokens/token'
import Unassigned from './unassigned'
import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Message from '../message'
import Format from '../format'
import Loader from '../loader'
import React from 'react'
import _ from 'lodash'

class Assignment extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    adding: PropTypes.bool,
    assigned: PropTypes.object,
    assignedEndpoint: PropTypes.string,
    assignedFormat: PropTypes.any,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    empty: PropTypes.object,
    footer: PropTypes.any,
    ids: PropTypes.array,
    item: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    q: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    unassigned: PropTypes.object,
    unassignedEndpoint: PropTypes.string,
    unassignedFormat: PropTypes.any,
    value: PropTypes.string,
    values: PropTypes.array,
    afterSave: PropTypes.func,
    onAdd: PropTypes.func,
    onBeginAdd: PropTypes.func,
    onChangeType: PropTypes.func,
    onFetchAssigned: PropTypes.func,
    onFetchUnassigned: PropTypes.func,
    onQuery: PropTypes.func,
    onRemove: PropTypes.func,
    onSetAssigned: PropTypes.func,
    onSetTypes: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    assignedFormat: Token,
    label: 'record',
    method: 'PATCH',
    text: 'title',
    unassignedFormat: Token,
    value: 'id'
  }

  list = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBeginAdd = this._handleBeginAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    const { assigned, assignedFormat, empty, footer, label, text, unassigned } = this.props
    return (
      <ModalPanel { ...this._getModalPanel() } >
        <div className={ this._getClass() }>
          <div className="assignment-body">
            { assigned.status === 'loading' && <Loader /> }
            { assigned.status !== 'loading' &&
              <div className="assignment-assigned">
                <div className="assignment-add" onClick={ this._handleBeginAdd }>
                  Assign a { label }...
                </div>
                { assigned.records.length === 0 &&
                  <Message { ...empty } />
                }
                { assigned.records.length > 0 &&
                  <div className="assignment-list" ref={ node => this.list = node}>
                    <TransitionGroup>
                      { assigned.records.map((assignment, index) => (
                        <CSSTransition classNames="expanded" timeout={ 1000 } exit={ false } key={`assigned_${assignment.id}`}>
                          <div className="assignment-item" >
                            <div className="assignment-item-token">
                              <Format { ...assignment } format={ assignedFormat } value={ _.get(assignment, text) }  />
                            </div>
                            <div className="assignment-item-icon" onClick={ this._handleRemove.bind(this, index) }>
                              <i className="fa fa-fw fa-times" />
                            </div>
                          </div>
                        </CSSTransition>
                      ))}
                    </TransitionGroup>
                  </div>
                }
              </div>
            }
            <div className="assignment-unassigned">
              <div className="assignment-unassigned-header">
                <Searchbox { ...this._getSearchbox() } />
              </div>
              <div className="assignment-unassigned-body">
                { unassigned.status === 'loading' && <Loader /> }
                { unassigned.status === 'success' &&
                  <Unassigned { ...this._getUnassigned() } />
                }
              </div>
            </div>
          </div>
          { footer &&
            <div className="assignment-footer">
              { footer }
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { assignedEndpoint, defaultValue, unassignedEndpoint, onFetchAssigned, onFetchUnassigned, onSetAssigned } = this.props
    onFetchUnassigned(unassignedEndpoint)
    if(defaultValue) onSetAssigned(defaultValue)
    if(!defaultValue) onFetchAssigned(assignedEndpoint)
  }

  componentDidUpdate(prevProps) {
    const { assigned } = this.props
    const { modal } = this.context
    if(assigned.records.length > prevProps.assigned.records.length) {
      if(assigned.status === prevProps.assigned.status) {
        this.list.scrollTop = this.list.scrollHeight
      }
    }
    if(assigned.status !== prevProps.assigned.status && assigned.status === 'saved') {
      modal.close()
    }
  }

  _getModalPanel() {
    const { title } = this.props
    return {
      title,
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _getClass() {
    const { adding } = this.props
    const classes = ['assignment']
    if(adding) classes.push('adding')
    return classes.join(' ')
  }

  _getSearchbox() {
    const { label } = this.props
    return {
      prompt: `Find a ${label}`,
      onChange: this.props.onQuery
    }
  }

  _getUnassigned() {
    const { text, unassigned, unassignedFormat, value } = this.props
    return {
      text,
      unassigned,
      value,
      format: unassignedFormat,
      onChoose: this._handleAdd
    }
  }

  _handleAdd(item) {
    this.props.onAdd(item)
  }

  _handleBeginAdd() {
    this.props.onBeginAdd()
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleSave() {
    const { action, values, onSave } = this.props
    onSave(action, values)
  }

}

export default Assignment
