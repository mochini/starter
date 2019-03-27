import PropTypes from 'prop-types'
import Action from '../action'
import React from 'react'
import _ from 'lodash'

class List extends React.Component {

  static propTypes = {
    format: PropTypes.any,
    itemActions: PropTypes.array,
    records: PropTypes.array,
    selectable: PropTypes.bool,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  static defaultProps = {}

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
              Header
            </div>
          </div>
        </div>
        { records.map((row, index) => (
          <div className="list-item" key={`row_${index}`}>
            <div className={ this._getClass(index) }>
              { selectable &&
                <div className="list-tile-icon" onClick={ this._handleToggle.bind(this, index) }>
                  { _.includes(selected, index) ?
                    <i className="fa fa-fw fa-check-circle" /> :
                    <i className="fa fa-fw fa-circle-o" />
                  }
                </div>
              }
              <div className="list-tile-details">
                { _.isFunction(format) ? React.createElement(format, row) : format }
              </div>
              { itemActions &&
                <div className="list-tile-actions">
                  <Action />
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(index) {
    const { selected } = this.props
    const classes = ['list-tile']
    if(_.includes(selected, index)) classes.push('selected')
    return classes.join(' ')
  }

  _handleToggle(index) {
    this.props.onToggle(index)
  }

  _handleToggleAll() {
    const { records } = this.props
    this.props.onToggleAll(records.length)
  }

}

export default List
