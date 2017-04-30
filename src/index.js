import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider  } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import App from './containers/App';
import './index.css';

const middleware = [ thunk ];
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
