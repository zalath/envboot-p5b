'use strict'
class init {
}
init.initipc = function (win, ipc) {
    ipc.on('boot', function (event, e) {
        init.getconfig(init.bootApps)
    })
    ipc.on('tt', function (event, e) {
        win.webContents.send('ss', 'res:' + e)
    })
    ipc.on('initd',function (event, e) {
        init.bootUp(win)
    })
}
var confdata
var win
init.getconfig = function (func) {
    var path = __dirname + '/../c.json'
    var fs = require('fs')
    var confpath = ''
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) return console.log(err);
        else {
            data = JSON.parse(data)
            confpath = data.confpath;
            fs.readFile(confpath, 'utf8', function (err, data) {
                if (err) return console.log(err)
                else {
                    confdata = JSON.parse(data)
                    if (func) func()
                }
            });
        }
    });
}
init.bootApps = function () {
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
init.bootUp = function (window) {
    win = window
    init.getconfig(init.init_main)
}
init.init_main = function () {
    win.webContents.send('inid',confdata)
}
module.exports = init