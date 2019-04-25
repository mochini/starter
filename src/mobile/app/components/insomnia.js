class Insomnia {

  _handlePause = this._handlePause.bind(this)
  _handleResume = this._handleResume.bind(this)

  constructor() {
    document.addEventListener('pause', this._handlePause, false)
    document.addEventListener('resume', this._handleResume, false)
  }

  recieve(action, data, callback) {
  }

  _handlePause() {
  }

  _handleResume() {
  }

}

export default Insomnia
