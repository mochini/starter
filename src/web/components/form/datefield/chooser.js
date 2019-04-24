import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Chooser extends React.PureComponent {

  static propTypes = {
    month: PropTypes.number,
    value: PropTypes.any,
    year: PropTypes.number,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onSetCurrent: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePrevious = this._handlePrevious.bind(this)

  render() {
    const { month, value, year } = this.props
    const current = { month, year, day: '01'}
    const start = moment(current).startOf('month')
    const end = moment(current).endOf('month')
    const date = moment(current).startOf('week').subtract(1, 'day')
    const today = moment()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="datefield-chooser">
          <div className="datefield-month">
            <div className="datefield-header">
              <div className="datefield-previous" onClick={ this._handlePrevious }>
                <i className="fa fa-fw fa-chevron-left" />
              </div>
              <div className="datefield-title">
                { moment(current).format('MMMM YYYY').toUpperCase() }
              </div>
              <div className="datefield-next" onClick={ this._handleNext }>
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
            <div className="datefield-weekdays">
              <div className="datefield-weekday">Sun</div>
              <div className="datefield-weekday">Mon</div>
              <div className="datefield-weekday">Tue</div>
              <div className="datefield-weekday">Wed</div>
              <div className="datefield-weekday">Thu</div>
              <div className="datefield-weekday">Fri</div>
              <div className="datefield-weekday">Sat</div>
            </div>
            { Array(6).fill().map((week, i) => (
              <div key={`week_${i}`} className="datefield-week">
                { [...Array(7)].map((day, j) => {
                  date.add('1', 'days')
                  return (
                    <div key={`day_${j}`} className={ this._getClass(date, start, end, value, today)} onClick={ this._handleChoose.bind(this, moment(date)) }>
                      { date.format('DD') }
                    </div>
                  )
                }) }
              </div>
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getClass(date, start, end, value, today) {
    const classes = ['datefield-day']
    if(date.isBefore(start, 'day') || date.isAfter(end, 'day')) classes.push('notmonth')
    if(date.isSame(value, 'day')) classes.push('selected')
    if(date.isSame(today, 'day')) classes.push('today')
    return classes.join(' ')
  }

  _getPanel() {
    return {
      title: 'Choose Date',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleChoose(value) {
    const { onChoose, onSetCurrent } = this.props
    onSetCurrent(parseInt(value.format('MM')) - 1, parseInt(value.format('YYYY')))
    onChoose(value)
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handlePrevious() {
    this.props.onPrevious()
  }

  _handleNext() {
    this.props.onNext()
  }

}

const mapStateToProps = (state, props) => state.datefield[props.cid]

export default connect(mapStateToProps)(Chooser)
