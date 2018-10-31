import { Action, handleActions } from 'redux-actions';
import { IDocument } from '../../types/index';

export interface IDocumentState {
  items: IDocument[],
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initialState: IDocumentState = {
  error: false,
  items: [],
  loaded: false,
  loading: false,
};

export const documentsReducerName = 'documents';

export const DOCUMENT_ACTION_TYPES = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
};

export const loading = (state: IDocumentState) => ({
  ...state,
  loading: true,
});
export const error = (state: IDocumentState) => ({
  ...state,
  error: true,
  loading: false,
});
export const success = (state: IDocumentState, { payload }: Action<IDocument[]>) => ({
  ...state,
  items: payload,
  loading: false,
});

// @TODO check why types are failing with handleActions
export const documentsReducer: any = handleActions({
  [DOCUMENT_ACTION_TYPES.LOADING]: loading,
  [DOCUMENT_ACTION_TYPES.ERROR]: error,
  [DOCUMENT_ACTION_TYPES.SUCCESS]: success,
}, initialState);