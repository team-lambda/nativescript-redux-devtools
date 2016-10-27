Redux Devtools for NativeScript

Setting up in existing {N} app:
```
npm i nativescript-redux-devtools --save
```

Add the devTools enchanser to your store:
```
var isAndroid = require("platform").isAndroid;
var devTools = require('remote-redux-devtools').default;

// For Android emulator: 10.0.2.2, For Genymotion  10.0.3.2. 
var hostname = isAndroid ? "10.0.3.2" : "localhost";

var store = createStore(counter, devTools({
  hostname,
  port: 8000,
  realtime: true
}))
```

The hostname can be `localhost` for iOS emulators or for Android 10.0.2.2 (10.0.3.2 for genymotion).

For real devices connected over USB you can use `adb reverse` for Android 21+, or your computer's IP over WiFi. 

### Server setups
For a test drive you can install the *remote-server*:
```
npm i remotedev-server --save-dev
```

And start it using npm script, add this in the package.json:
```
    "scripts": {
        "remotedev": "remotedev --hostname=localhost --port=8000"
    }
```
Run it with:
```
npm run remotedev
```

Your app should connect to that server.
Further you can install the [RemoteDev Chrome app](https://chrome.google.com/webstore/detail/remotedev/faicmgpfiaijcedapokpbdejaodbelph) and use it to manage your {N} app.
