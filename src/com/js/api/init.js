'use strict'

const exec = require('child_process').exec;
const conf = require("./conf")
class init {}
init.initipc = function (win, ipc, shell, app) {
    ipc.on('bootenv', function (event, e) {
        conf.getconfig(init.bootApps)
    })
    ipc.on('tt', function (event, e) {
        win.webContents.send('ss', 'res:' + e)
    })
    ipc.on('initd',function (event, e) {
        init.bootUp(win)
    })
    ipc.on('tobrowser',function(event,arg){
        shell.openExternal(arg)
    })
    ipc.on('closeapp',function(event){
        app.exit()
    })
    ipc.on('closewin',function(event){
        win.close()
    })
}
var win
init.bootUp = function (window) {
    win = window
    conf.getconfig(init.init_main)
}
init.init_main = function (confdata) {
    win.webContents.send('inid',confdata)
}
init.bootApps = function (confdata) {
    var list = confdata['boot'];
    var i = 1;
    while (typeof (list[i]) != 'undefined') {
        if (list[i].indexOf('/') > 0) {
            exec('"' + list[i] + '"');
        } else {
            exec(list[i]);
        }
        i++;
    }
}
module.exports = init