import Preview from '../../preview'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Filefield extends React.PureComponent {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    defaultValue: PropTypes.any,
    ids: PropTypes.array,
    multiple: PropTypes.bool,
    progress: PropTypes.number,
    status: PropTypes.string,
    uploads: PropTypes.array,
    value: PropTypes.number,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    onReady: PropTypes.func,
    onReset: PropTypes.func,
    onUpdateAsset: PropTypes.func,
    onUpdateProgress: PropTypes.func
  }

  static defaultProps = {
    multiple: false,
    onChange: () => {},
    onReady: () => {}
  }

  button = null

  _handleAdd = this._handleAdd.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handleUpdateAsset = this._handleUpdateAsset.bind(this)
  _handleUpdateProgress = this._handleUpdateProgress.bind(this)

  render() {
    const { uploads } = this.props
    return (
      <div className="filefield">
        { uploads.map((upload, index) => (
          <div className="filefield-preview" key={`upload_${index}`}>
            <div className="filefield-preview-frame">
              <Preview image={ upload } key={`preview_${index}` } />
            </div>
            <div className="filefield-preview-remove">
              <i className="fa fa-fw fa-times" />
            </div>
          </div>
        )) }
        <div className="ui red button" ref={ node => this.button = node }>
          Upload File
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    const { token } = this.context.presence
    this.resumable = new Resumable({
      target: '/api/assets/upload',
      chunkSize: 1024 * 256,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileProgress', this._handleUpdateProgress)
    this.resumable.on('fileSuccess', this._handleUpdateAsset)
    this.resumable.on('complete', this._handleComplete)
    this.resumable.assignBrowse(this.button)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { ids } = this.props
    if(!_.isEqual(prevProps.ids, ids)) {
      this._handleChange()
    }
  }

  _handleAdd(upload) {
    this.props.onAdd({
      file: upload.file,
      status: 'pending',
      uniqueIdentifier: upload.uniqueIdentifier
    })
    this.resumable.upload()
  }

  _handleChange() {
    const { ids, multiple } = this.props
    const value = multiple ? ids : ids[0]
    this.props.onChange(value)
  }

  _handleComplete() {
    this.props.onComplete()
  }

  _handleUpdateAsset(upload, data) {
    const { uploads, onUpdateAsset } = this.props
    const { uniqueIdentifier } = upload
    const result = JSON.parse(data)
    this.resumable.removeFile(upload)
    const index = _.findIndex(uploads, { uniqueIdentifier })
    onUpdateAsset(index, result.data)
  }

  _handleUpdateProgress(upload) {
    const { uploads, onUpdateProgress } = this.props
    const { uniqueIdentifier } = upload
    const progress = this.resumable.progress()
    const index = _.findIndex(uploads, { uniqueIdentifier })
    onUpdateProgress(index, progress)
  }

}

export default Filefield
