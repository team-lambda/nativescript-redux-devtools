import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { Label } from "ui/label";
import { isAndroid } from "platform";
import { createStore } from 'redux';
import { counter } from "./counter.reducer"
var devTools = require('remote-redux-devtools').default;

let counterLbl: Label;
export function navigatingTo(args: EventData) {
  let page = <Page>args.object;
  counterLbl = <Label>page.getViewById("counter");
}

export function increment() {
  store.dispatch({ type: 'INCREMENT' })
}

export function decrement() {
  store.dispatch({ type: 'DECREMENT' })
}


var hostname = isAndroid ? "10.0.3.2" : "localhost";

var store = createStore(counter, devTools({
  hostname,
  port: 8000,
  realtime: true
}))

store.subscribe(() => {
  let state = store.getState();

  console.log(state);
  counterLbl.text = state;
})