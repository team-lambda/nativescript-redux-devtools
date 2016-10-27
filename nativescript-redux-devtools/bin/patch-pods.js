// Run after `tns prepare ios`

var fs = require("fs");

function patch(file, from, to) {
    try {
        if (fs.existsSync(file)) {
            console.log("File " + file + " exists, patching...");
            var src = fs.readFileSync(file).toString();
            src = src.replace(from, to);
            console.log("Delete it.");
            fs.unlink(file);
            console.log("Writing its patched version...");
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
    // NOTE: Hope pod install passed
    // platforms/ios/Pods/PocketSocket/PocketSocket/PSPocketSocketDriver.m
    // if(_pmdEnabled && !frame->control && (frame->rsv1 || (_initialFrame && _initialFrame->rsv1))) {
    patch("./platforms/ios/Pods/PocketSocket/PocketSocket/PSWebSocketDriver.m",
        "if(_pmdEnabled && !frame->control && (frame->rsv1 || _initialFrame->rsv1)) {",
        "if(_pmdEnabled && !frame->control && (frame->rsv1 || (_initialFrame && _initialFrame->rsv1))) {");
}