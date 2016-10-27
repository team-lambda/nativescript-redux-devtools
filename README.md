Redux Devtools for NativeScript
===============================

Setting up in existing {N} app:
```
npm i nativescript-redux-devtools
```

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
