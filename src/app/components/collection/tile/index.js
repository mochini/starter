import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class List extends React.Component {

  static propTypes = {
    format: PropTypes.any,
    records: PropTypes.array,
    selected: PropTypes.array,
    onToggle: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { records, format, selected } = this.props
    return (
      <div className="tiles">
        { records.map((row, index) => (
          <div className="tile-item" key={`row_${index}`}>
            <div className={ this._getClass(index) }>
              <div className="tile-icon" onClick={ this._handleToggle.bind(this, index) }>
                { _.includes(selected, index) ?
                  <i className="fa fa-fw fa-check-circle" /> :
                  <i className="fa fa-fw fa-circle-o" />
                }
              </div>
              <div className="tile-details">
                { _.isFunction(format) ? React.createElement(format, row) : format }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(index) {
    const { selected } = this.props
    const classes = ['tile']
    if(_.includes(selected, index)) classes.push('selected')
    return classes.join(' ')
  }

  _handleToggle(index) {
    this.props.onToggle(index)
  }

}

export default List
