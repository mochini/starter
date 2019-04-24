import { createSelector } from 'reselect'

const uploads = (state, props) => state.uploads

export const ids = createSelector(
  uploads,
  (uploads) => uploads.filter(upload => {
    return upload.asset !== null
  }).map(upload => {
    return upload.asset.id
  })
)
