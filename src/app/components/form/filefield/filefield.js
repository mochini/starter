import Preview from '../../preview'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Image from '../../image'
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
    prompt: PropTypes.string,
    status: PropTypes.string,
    uploads: PropTypes.array,
    value: PropTypes.number,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onUpdateAsset: PropTypes.func,
    onUpdateProgress: PropTypes.func
  }

  static defaultProps = {
    multiple: false,
    prompt: 'Choose File',
    onChange: () => {},
    onReady: () => {}
  }

  button = null

  _handleAdd = this._handleAdd.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handleUpdateAsset = this._handleUpdateAsset.bind(this)
  _handleUpdateProgress = this._handleUpdateProgress.bind(this)

  render() {
    const { multiple, prompt, uploads } = this.props
    return (
      <div className="filefield">
        { uploads.map((upload, index) => (
          <div className="filefield-preview" key={`upload_${index}`}>
            <div className="filefield-preview-frame">
              { upload.file ?
                <Preview image={ upload } key={`preview_${index}` } /> :
                <Image src={ upload.asset.path } />
              }
            </div>
            { upload.status === 'uploading' &&
              <div className="ui green progress">
                <div className="bar" style={{ width: `${upload.progress}%`}}>
                  <div className="progress">{ upload.progress }%</div>
                </div>
              </div>
            }
            <div className="filefield-preview-remove" onClick={ this._handleRemove.bind(this, index)}>
              <i className="fa fa-fw fa-times" />
            </div>
          </div>
        )) }
        <div ref={ node => this.button = node }>
          { (multiple === true || uploads.length === 0) &&
            <div className="ui red button">
              { prompt }
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    this._handleInit()
    if(defaultValue) return this._handleFetch()
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { ids, status, onReady } = this.props
    if(!_.isEqual(prevProps.ids, ids)) {
      this._handleChange()
    } else if(prevProps.status, status) {
      if(status === 'loaded') {
        onReady()
      }
    }
  }

  _handleAdd(upload) {
    this.props.onAdd({
      file: upload.file,
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

  _handleFetch() {
    const { defaultValue, multiple, onFetch } = this.props
    const ids = _.castArray(defaultValue)
    const $in = multiple ? ids : ids.slice(0, 1)
    if($in.length === 0) return
    const $filter = { id: { $in } }
    onFetch({ $filter })
  }

  _handleInit() {
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
  }

  _handleRemove(index) {
    this.props.onRemove(index)
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
    const progress = Math.floor(this.resumable.progress() * 100)
    const index = _.findIndex(uploads, { uniqueIdentifier })
    onUpdateProgress(index, progress)
  }

}

export default Filefield
