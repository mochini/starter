import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Preview from './preview'
import React from 'react'
import _ from 'lodash'

class Uploader extends React.Component {

  static childContextTypes = {
    uploader: PropTypes.object
  }

  static contextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    children: PropTypes.any,
    chunks: PropTypes.number,
    percent: PropTypes.number,
    progress: PropTypes.number,
    status: PropTypes.string,
    uploads: PropTypes.array,
    onAddUpload: PropTypes.func,
    onComplete: PropTypes.func,
    onReset: PropTypes.func,
    onSaveUpload: PropTypes.func,
    onUpdateUpload: PropTypes.func
  }

  state = {
    uploads: 0
  }

  resumable = null
  upload = null
  tour_id = null
  visit_id = null

  _handleAddUpload = this._handleAddUpload.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleUpdateProgress = this._handleUpdateProgress.bind(this)
  _handleUploadSuccess = this._handleUploadSuccess.bind(this)

  render() {
    const { active, children, percent, status, uploads } = this.props
    return (
      <div className="uploader">
        { children }
        <div ref={ node => this.upload = node } />
        { status !== 'pending' &&
          <div className="uploader-status">
            <div className="ui inverted segment">
              { status === 'uploading' &&
                <div className="uploader-progress">
                  <div className="uploader-progress-preview">
                    <div className="uploader-progress-preview-frame">
                      <Preview image={ uploads[active] } key={`preview_${active}` } />
                    </div>
                  </div>
                  <div className="uploader-progress-details">
                    <div className="uploader-progress-meter">
                      <div className="ui tiny green inverted progress">
                        <div className="bar" style={{ width: `${percent}%` }}></div>
                        <div className="label">
                          Uploading { active + 1 } / { uploads.length } photos ({ percent }%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              { status === 'complete' &&
                <div className="uploader-complete">
                  <i className="fa fa-check" /> Uploads complete
                </div>
              }
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.resumable = new Resumable({
      target: `/api/assets/upload`,
      chunkSize: 1024 * 256,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      fileType: ['jpg','png','gif','jpeg']
    })
    this.resumable.on('fileAdded', this._handleAddUpload)
    this.resumable.on('fileProgress', this._handleUpdateProgress)
    this.resumable.on('fileSuccess', this._handleUploadSuccess)
    this.resumable.on('complete', this._handleComplete)
    this.resumable.assignBrowse(this.upload)
  }

  componentDidUpdate(prevProps) {
    const { host } = this.context
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'uploading') {
        host.keepAwake()
      }
      if(status === 'complete') {
        host.allowSleep()
        setTimeout(this._handleReset, 5000)
      }
    }
  }

  getChildContext() {
    return {
      uploader: {
        browse: this._handleBrowse
      }
    }
  }

  _handleBrowse(tour_id, visit_id) {
    this.tour_id = tour_id
    this.visit_id = visit_id
    setTimeout(() => this.upload.click(), 250)
  }

  _handleAddUpload(upload) {
    this.props.onAddUpload({
      tour_id: this.tour_id,
      visit_id: this.visit_id,
      file: upload.file,
      status: 'pending',
      uniqueIdentifier: upload.uniqueIdentifier
    })
    this.resumable.upload()
  }

  _handleComplete() {
    this.props.onComplete()
  }

  _handleReset() {
    this.props.onReset()
  }

  _handleUpdateProgress(upload) {
    const { uploads } = this.props
    const progress = this.resumable.progress()
    const active = _.findIndex(uploads, { uniqueIdentifier: upload.uniqueIdentifier })
    this.props.onUpdateUpload(active, progress)
  }

  _handleUploadSuccess(upload, data) {
    const { uploads } = this.props
    const result = JSON.parse(data)
    this.resumable.removeFile(upload)
    const { tour_id, visit_id } = _.find(uploads, { uniqueIdentifier: upload.uniqueIdentifier })
    this.props.onSaveUpload(upload.uniqueIdentifier, tour_id, visit_id, result.data.id)
  }

}

export default Uploader
