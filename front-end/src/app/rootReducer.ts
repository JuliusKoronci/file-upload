import { combineReducers } from 'redux';
import { IAppState } from '../types/IAppState';
import { documentsReducerName, documentsReducer } from '../domains/Documents';

const rootReducer = combineReducers<IAppState>({
  [documentsReducerName]: documentsReducer,
});

export default rootReducer;