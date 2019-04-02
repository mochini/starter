import PropTypes from 'prop-types'
import React from 'react'

class Tools extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    tool: PropTypes.string,
    tools: PropTypes.array,
    onChangeTool: PropTypes.func
  }

  render() {
    const { tools } = this.props
    return (
      <div className="collection-header-tools">
        <div className="collection-tools">
          { tools.map((tool, index) => (
            <div key={`tool_${index}`} className={ this._getClass(tool.key) } tooltip={ tool.title } onClick={ this._handleClick.bind(this, tool.key) }>
              <i className={`fa fa-fw fa-${tool.icon}`} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  _getClass(key) {
    const { tool } = this.props
    const classes = ['collection-tool']
    if(key === tool) classes.push('active')
    return classes.join(' ')
  }

  _handleClick(tool) {
    this.props.onChangeTool(tool)
  }

}

export default Tools
