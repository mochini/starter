import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import React from 'react'

class Home extends React.Component {

  static contextTypes = {}

  static propTypes = {
    t: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { t } = this.props
    return (
      <div>
        { t('Hello {{first_name}}!', { first_name: 'Greg' }) }
      </div>
    )
  }

}

export default withTranslation()(Home)
