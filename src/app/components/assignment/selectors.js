import { createSelector } from 'reselect'
import _ from 'lodash'

const unfiltered = (state, props) => ({
  status: state.unassigned.status,
  records: state.unassigned.records || []
})

const assigned = (state, props) => ({
  status: state.assigned.status,
  records: state.assigned.records || []
})

const q = (state, props) => state.q.toLowerCase()

const text = (state, props) => props.text

const filtered = createSelector(
  unfiltered,
  q,
  text,
  (unassigned, q, text) => ({
    status: unassigned.status,
    records: unassigned.records.filter(record => {
      if(q.length === 0) return true
      return record[text].toLowerCase().search(q) >= 0
    })
  })
)

export const unassigned = createSelector(
  filtered,
  assigned,
  (filtered, assigned) => ({
    status: filtered.status,
    records: filtered.records.filter(record => {
      return _.findIndex(assigned.records, { id: record.id }) < 0
    })
  })
)

export const ids = createSelector(
  assigned,
  (assigned) => assigned.records.map(item => item.id)
)

export const values = createSelector(
  assigned,
  (assigned) => assigned.records.reduce((values, assignee) => [
    ...values,
    assignee.id
  ], [])
)
