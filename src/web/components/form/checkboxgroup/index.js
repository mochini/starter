import Select from '../select'
import React from 'react'

class CheckboxGroup extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <Select { ...this._getSelect() } />
  }

  _getSelect() {
    return {
      ...this.props,
      multiple: true
    }
  }

}

export default CheckboxGroup
