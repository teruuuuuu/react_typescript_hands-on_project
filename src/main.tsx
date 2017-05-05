import * as React from "react";
import * as ReactDOM from 'react-dom';

import StoreConfig from './store/store-config';
import { Provider } from 'react-redux'

import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/main.css'

import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstComponent from './components/first-component';
import ListComponent from './components/list-component';

const store = StoreConfig({});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ FirstComponent as any } />
        <Route exact path="/first" component={ FirstComponent as any } />
        <Route exact path="/list" component={ ListComponent as any } />
      </Switch>
    </BrowserRouter>
  </Provider >
    ,document.getElementById("app")
);
