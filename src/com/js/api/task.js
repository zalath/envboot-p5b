'use strict'
const { BrowserWindow } = require("electron")
const winURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `file://${__dirname}/index.html`
class task {}
var twin = null
task.init = function(ipc) {
    var taskwin = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        title: 'Task',
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          enableRemoteModule: true,
          contextIsolation: false
        }
    })
    twin = taskwin
    taskwin.loadURL(winURL + '#/task');
    taskwin.on('close', function() {
        twin = null
    })
    // if (!process.env.IS_TEST)taskwin.webContents.openDevTools();
    ipc.once('taskclose',function(event){
        try {
            taskwin.close()
        }catch(e){
            console.log(e)
        }
    })
}
task.listen = function(ipc) {
    ipc.on('taskpage',function(event){
        if(twin !== null){
            twin.show();
        } else {
            task.init(ipc)
        }
    })
}
module.exports = task
