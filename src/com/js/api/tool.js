'use strict'
const { BrowserWindow } = require("electron")
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`
class conf {}
var cwin = null
conf.init = function(ipc) {
    console.log('init tool page')
    var starterwin = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        title: 'Tool',
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false
        }
    })
    cwin = starterwin
    starterwin.loadURL(winURL + '#/tool');
    starterwin.on('close', function() {
        cwin = null
    })
    // if (!process.env.IS_TEST)starterwin.webContents.openDevTools();
    ipc.once('confclose',function(event){
        try {
            starterwin.close()
        }catch(e){
            console.log(e)
        }
    })
}
conf.listen = function(ipc) {
    ipc.on('toolpage',function(event){
        if(cwin !== null){
            cwin.show();
        } else {
            conf.init(ipc)
        }
    })
}
module.exports = conf