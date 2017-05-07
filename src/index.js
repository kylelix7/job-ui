import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import App from "./containers/App";
import "./index.css";

const middleware = [thunk];
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
