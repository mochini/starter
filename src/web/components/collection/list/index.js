import Token from '../../../tokens/token'
import Actions from '../actions/index'
import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

class List extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    format: PropTypes.any,
    itemActions: PropTypes.array,
    link: PropTypes.func,
    records: PropTypes.array,
    selectable: PropTypes.bool,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  static defaultProps = {
    format: Token
  }

  _handleToggleAll = this._handleToggleAll.bind(this)

  render() {
    const { itemActions, records, format, selectable, selectAll, selected } = this.props
    return (
      <div className="list">
        <div className="list-tile-header">
          <div className="list-tile">
            { selectable &&
              <div className="list-tile-icon" onClick={ this._handleToggleAll }>
                { selectAll ?
                  <i className="fa fa-fw fa-check-circle" /> :
                  <i className="fa fa-fw fa-circle-o" />
                }
              </div>
            }
            <div className="list-tile-details">
              <Format value="Header" format={ Token } />
            </div>
          </div>
        </div>
        { records.map((record, index) => (
          <div className="list-item" key={ record.id }>
            <div className={ this._getClass(index) } onClick={ this._handleClick.bind(this, record) }>
              { selectable &&
                <div className="list-tile-icon" onClick={ this._handleToggle.bind(this, index) }>
                  { _.includes(selected, index) ?
                    <i className="fa fa-fw fa-check-circle" /> :
                    <i className="fa fa-fw fa-circle-o" />
                  }
                </div>
              }
              <div className="list-tile-details">
                <Format { ...record } format={ format } />
              </div>
              { itemActions && itemActions.length > 0 &&
                <div className="list-tile-actions">
                  <Actions { ...this._getActions(record) } />
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getActions(record) {
    const { itemActions } = this.props
    return {
      record,
      items: itemActions
    }
  }

  _getClass(index) {
    const { selected } = this.props
    const classes = ['list-tile']
    if(_.includes(selected, index)) classes.push('selected')
    return classes.join(' ')
  }

  _handleClick(record) {
    const { history } = this.context.router
    const { link } = this.props
    if(link) history.push(link(record))
  }

  _handleToggle(index, e) {
    e.stopPropagation()
    this.props.onToggle(index)
  }

  _handleToggleAll() {
    const { records } = this.props
    this.props.onToggleAll(records.length)
  }

}

export default List
