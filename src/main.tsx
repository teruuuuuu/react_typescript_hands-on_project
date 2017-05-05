import * as React from "react";
import * as ReactDOM from 'react-dom';

import StoreConfig from './store/store-config';
import { Provider } from 'react-redux'

import FirstComponent from "./components/first-component";

const store = StoreConfig({});
ReactDOM.render(
    <Provider store={ store }>
      <FirstComponent />
    </Provider>
    ,document.getElementById("app")
);
