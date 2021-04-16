'use strict'
const { BrowserWindow } = require("electron")
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`
const conf = require("./conf")
const exec = require('child_process').exec;
class starter {}
var swin = null
starter.init = function(ipc) {
    console.log('init starter page')
    var starterwin = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        title: 'Starter',
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false
        }
    })
    swin = starterwin
    starterwin.loadURL(winURL + '#/starter');
    starterwin.on('close', function() {
        swin = null
    })
    if (!process.env.IS_TEST)starterwin.webContents.openDevTools();
    ipc.once('starterclose',function(event){
        try {
            starterwin.close()
        }catch(e){
            console.log(e)
        }
    })
    ipc.on('starterdata',function(event){
        conf.getconfig(starter.sendconf)
    })
    ipc.on('openProject',function(event,args){
        exec('code '+args,{});
    });
    ipc.on('openFolder',function(event,args){
        var path = args.replace(/\//g,'\\');
        exec('explorer '+ path,{});
    });
}
starter.listen = function(ipc) {
    ipc.on('starterlist',function(event){
        if(swin !== null){
            swin.show();
        } else {
            starter.init(ipc)
        }
        
    })
}
starter.sendconf = function(confdata) {
    swin.webContents.send('starterdata',confdata)
}
module.exports = starter
