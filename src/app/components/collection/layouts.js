import PropTypes from 'prop-types'
import React from 'react'

class Layouts extends React.Component {

  static contextTypes = {}

  static propTypes = {
    layouts: PropTypes.array,
    layout: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    const { layouts } = this.props
    return (
      <div className="collection-layouts">
        { layouts.map((layout, index) => (
          <div className={ this._getClass(layout.key) } key={`layout_${index}`} onClick={ this._handleClick.bind(this, layout.key) } title={ layout.key }>
            <i className={`fa fa-fw fa-${layout.icon}`} />
          </div>
        )) }
      </div>
    )
  }

  _getClass(key) {
    const { layout } = this.props
    const classes = ['collection-layout']
    if(key === layout) classes.push('active')
    return classes.join(' ')
  }

  _handleClick(key) {
    this.props.onChange(key)
  }

}

export default Layouts
