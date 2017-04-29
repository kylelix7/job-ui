import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider  } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './containers/App';
import './index.css';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
