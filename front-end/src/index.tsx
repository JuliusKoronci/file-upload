import * as React from 'react';
import * as ReactDOM from 'react-dom';

import configureStore, { sagaMiddleware } from './app/createStore';
import Root from './app/Root';
import initialState from './domains/initialState';
import rootSaga from './domains/sagas';
import { Home } from './pages/Home';

const store = configureStore(initialState);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Root store={store}><Home /></Root>,
  document.getElementById('root') as HTMLElement,
);
