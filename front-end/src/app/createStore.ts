import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { DevTools, isProd } from '../common';
import { IAppState } from '../types/IAppState';
import rootReducer from './rootReducer';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState: IAppState) {
  const middleWares = [sagaMiddleware];
  
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWares)),
  );
}

function configureStoreDev(initialState: IAppState) {
  const middleWares = [logger, sagaMiddleware];
  
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWares), DevTools.instrument()),
  );
  
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }
  
  return store;
}

const configureStore = isProd() ? configureStoreProd : configureStoreDev;

export default configureStore;