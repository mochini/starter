class Insomnia {

  app = null

  _handlePause = this._handlePause.bind(this)
  _handleResume = this._handleResume.bind(this)

  constructor(app) {
    this.app = app
    document.addEventListener('pause', this._handlePause, false)
    document.addEventListener('resume', this._handleResume, false)
  }

  recieve(action, data) {
  }

  _handlePause() {
  }

  _handleResume() {
  }

}

export default Insomnia
