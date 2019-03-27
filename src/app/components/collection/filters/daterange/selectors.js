import { createSelector } from 'reselect'
import _ from 'lodash'

const include = (state, props) => props.include || ['this','last','next']

export const options = createSelector(
  include,
  (include) => {
    const options = []
    if(_.includes(include, 'this')) options.push({ value: 'this_week', text: 'This Week' })
    if(_.includes(include, 'last')) options.push({ value: 'last_week', text: 'Last Week' })
    if(_.includes(include, 'next')) options.push({ value: 'next_week', text: 'Next Week' })
    if(_.includes(include, 'this')) options.push({ value: 'this_month', text: 'This Month' })
    if(_.includes(include, 'last')) options.push({ value: 'last_month', text: 'Last Month' })
    if(_.includes(include, 'next')) options.push({ value: 'next_month', text: 'Next Month' })
    if(_.includes(include, 'this')) options.push({ value: 'this_quarter', text: 'This Quarter' })
    if(_.includes(include, 'last')) options.push({ value: 'last_quarter', text: 'Last Quarter' })
    if(_.includes(include, 'next')) options.push({ value: 'next_quarter', text: 'Next Quarter' })
    if(_.includes(include, 'this')) options.push({ value: 'this_year', text: 'This Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_year', text: 'Last Year' })
    if(_.includes(include, 'next')) options.push({ value: 'next_year', text: 'Next Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_30', text: 'Last 30 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_30', text: 'Next 30 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_60', text: 'Last 60 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_60', text: 'Next 60 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_90', text: 'Last 90 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_90', text: 'Next 90 Days' })
    options.push({ value: 'ytd', text: 'Year to Date' })
    options.push({ value: 'ltd', text: 'Life to Date' })
    options.push({ value: 'custom', text: 'Custom' })
    return options
  }
)
