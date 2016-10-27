global.process = { env: {} };
import * as app from 'application';
require('nativescript-websockets');

app.start({ moduleName: 'main-page' });
