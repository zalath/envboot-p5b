'use strict'
const { BrowserWindow } = require("electron")
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`
class conf {}
var cwin = null
conf.init = function(ipc) {
    console.log('init starter page')
    var starterwin = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        title: 'Conf',
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false
        }
    })
    cwin = starterwin
    starterwin.loadURL(winURL + '#/conf');
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
    ipc.on('confdata',function(event){
        conf.getconfig(conf.sendconf)
    })
    ipc.on('setconf',function(event,e){
        conf.setconfig(e)
    })
}
conf.listen = function(ipc) {
    ipc.on('confpage',function(event){
        if(cwin !== null){
            cwin.show();
        } else {
            conf.init(ipc)
        }
    })
}
conf.sendconf = function(confdata) {
    cwin.webContents.send('confdata',confdata)
}
conf.getconfig = function(func) {
    var path = process.cwd() + '/c.json'
    var fs = require('fs')
    var confdata = {}
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) return console.log(err)
        else {
            confdata = JSON.parse(data)
            if (func) func(confdata)
        }
    });
}
conf.setconfig = function(data) {
    var path = process.cwd() + '/c.json'
    var fs = require('fs')
    var confdata = JSON.stringify(data)
    fs.writeFile(path,confdata,function(){
        console.log('writen')
        cwin.webContents.send('confsaved');
    })
}
module.exports = conf