import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import Search from '../../search'

class Chooser extends React.PureComponent {

  static propTypes = {
    endpoint: PropTypes.string,
    text: PropTypes.string,
    format: PropTypes.any,
    multiple: PropTypes.bool,
    value: PropTypes.string,
    onCancel: PropTypes.func,
    onSet: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Search { ...this._getSearch() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Items',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
      ]
    }
  }

  _getSearch() {
    const { endpoint, format, multiple, text, value } = this.props
    return {
      endpoint,
      format,
      multiple,
      text,
      value,
      onChange: this._handleChange
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(selected) {
    this.props.onSet(selected)
  }

}

const mapStateToProps = (state, props) => state.lookup[props.cid]

export default connect(mapStateToProps)(Chooser)
