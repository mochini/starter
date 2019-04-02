import Select from '../select'
import React from 'react'

class RadioGroup extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <Select { ...this._getSelect() } />
  }

  _getSelect() {
    return {
      ...this.props,
      multiple: false
    }
  }

}

export default RadioGroup
