import * as React from 'react';
import * as ReactDOM from 'react-dom';

// setting up axios
import './app/api';

import configureStore, { sagaMiddleware } from './app/createStore';
import Root from './app/Root';
import rootSaga from './domains/sagas';
import { Home } from './pages/Home';
import { IAppState } from './types/IAppState';

const store = configureStore({} as IAppState);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Root store={store}><Home /></Root>,
  document.getElementById('root') as HTMLElement,
);
