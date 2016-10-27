// Run after `tns prepare ios`

var fs = require("fs");

function rename(from, to) {
    try {
        if (fs.existsSync(from)) {
            console.log("File " + from + " exists, renaming...");
            fs.renameSync(from, to);
            console.log("Renamed!")
        } else {
            console.log("File " + from + " does not exists!");
        }
    } catch(e) {
        console.log("Error: " + e);
    }
}

function patch(file, from, to) {
    try {
        if (fs.existsSync(file)) {
            console.log("File " + file + " exists, patching...");
            var src = fs.readFileSync(file).toString();
            src = src.replace(from, to);
            fs.writeFileSync(file, src);
            console.log("Patched!");
        } else {
            console.log("File " + file + " does not exists!");
        }
    } catch(e) {
        console.log("Error: " + e);
    }
}

module.exports = function() {
    // linked-list: _modue -> module
    rename("./node_modules/remote-redux-devtools/node_modules/socketcluster-client/node_modules/linked-list/_source", "./node_modules/remote-redux-devtools/node_modules/socketcluster-client/node_modules/linked-list/source");
    rename("./node_modules/linked-list/_source", "./node_modules/linked-list/source");

    patch("./node_modules/remote-redux-devtools/node_modules/socketcluster-client/node_modules/linked-list/index.js",
        "require('./_source/linked-list.js')",
        "require('./source/linked-list.js')");
    patch("./node_modules/linked-list/index.js",
        "require('./_source/linked-list.js')",
        "require('./source/linked-list.js')");

    // sctransport.js - require('ws') -> global.WebSocket
    patch("./node_modules/remote-redux-devtools/node_modules/socketcluster-client/lib/sctransport.js",
        "require('ws')",
        "global.WebSocket");
    patch("./node_modules/socketcluster-client/lib/sctransport.js",
        "require('ws')",
        "global.WebSocket");

    // NOTE: Hope pod install passed
    // platforms/ios/Pods/PocketSocket/PocketSocket/PSPocketSocketDriver.m
    // if(_pmdEnabled && !frame->control && (frame->rsv1 || (_initialFrame && _initialFrame->rsv1))) {
    patch("./platforms/ios/Pods/PocketSocket/PocketSocket/PSWebSocketDriver.m",
        "if(_pmdEnabled && !frame->control && (frame->rsv1 || _initialFrame->rsv1)) {",
        "if(_pmdEnabled && !frame->control && (frame->rsv1 || (_initialFrame && _initialFrame->rsv1))) {");

}
