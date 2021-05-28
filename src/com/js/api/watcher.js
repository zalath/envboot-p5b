'use strict'
const { BrowserWindow } = require("electron")
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`
const cpu = require('cpu-stat')
const os = require('os')
class watcher {}
var cwin = null
watcher.init = function(ipc) {
    var starterwin = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        title: 'Watcher',
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false
        }
    })
    cwin = starterwin
    starterwin.loadURL(winURL + '#/watcher');
    starterwin.on('close', function() {
        cwin = null
    })
    // if (!process.env.IS_TEST)starterwin.webContents.openDevTools();
    ipc.once('watcherclose',function(event){
        try {
            starterwin.close()
        }catch(e){
            console.log(e)
        }
    })
}
watcher.listen = function(ipc) {
    ipc.on('watcherpage',function(event){
        if(cwin !== null){
            cwin.show();
        } else {
            watcher.init(ipc)
            setInterval(() => {watcher.readbit()}, 1000);
        }
    })
}

watcher.readbit = function() {
  cpu.usagePercent(watcher.usagePercent);
  if (cwin) cwin.webContents.send('addmemdata',(os.totalmem()-os.freemem())*100/os.totalmem())
  // read disk usage
  // read network usage
}
watcher.usagePercent = function (msg,rate,diffsecond) {
  if(msg == null){
      if (cwin) cwin.webContents.send('addcpudata',rate);
  }
}
module.exports = watcher