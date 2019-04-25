const { app, BrowserWindow } = require('electron')

const handleReady = () => {

  const win = new BrowserWindow({
    movable: false,
    width: 1024,
    height: 768,
    titleBarStyle: 'hidden'
  })

  win.loadFile('index.html')

}

app.on('ready', handleReady)
