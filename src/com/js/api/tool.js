'use strict'
const { BrowserWindow } = require("electron")
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`
class tool {}
var cwin = null
tool.init = function(ipc) {
    var starterwin = new BrowserWindow({
        width: 800,
        height: 800,
        transparent: true,
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
    ipc.once('toolclose',function(event){
        try {
            starterwin.close()
        }catch(e){
            console.log(e)
        }
    })
}
tool.listen = function(ipc) {
    ipc.on('toolpage',function(event){
        if(cwin !== null){
            cwin.show();
        } else {
            tool.init(ipc)
        }
    })
}
module.exports = tool