import PropTypes from 'prop-types'
import React from 'react'

class ColorField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.string,
    colors: PropTypes.array,
    color: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    colors: [
      { name: 'red', value: '#DB2828' },
      { name: 'orange', value: '#F2711C' },
      { name: 'yellow', value: '#FBBD08' },
      { name: 'olive', value: '#B5CC18' },
      { name: 'green', value: '#21BA45' },
      { name: 'teal', value: '#00B5AD' },
      { name: 'blue', value: '#2185D0' },
      { name: 'violet', value: '#6435C9' },
      { name: 'purple', value: '#A333C8' },
      { name: 'pink', value: '#E03997' }
    ],
    onChange: () => {},
    onReady: () => {}
  }

  _handleSet = this._handleSet.bind(this)

  render() {
    const { colors } = this.props
    return (
      <div className="colorfield" tabIndex={ 0 }>
        { colors.map((color, index) => (
          <div key={`color_${index}`} className="colorfield-color" style={{ backgroundColor: color.value }} onClick={ this._handleSet.bind(this, color) }>
            { color.name === this.props.color && <i className="fa fa-fw fa-check" /> }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { color, onChange } = this.props
    if(prevProps.color !== color) {
      onChange(color)
    }
  }

  _handleSet(color) {
    this.props.onSet(color.name)
  }

}

export default ColorField
