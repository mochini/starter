import { createSelector } from 'reselect'

const progress = (state, props) => state.progress

export const percent = createSelector(
  progress,
  (progress) => Math.floor(progress * 100)
)
