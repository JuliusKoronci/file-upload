import { handleActions } from 'redux-actions';
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
  ADD: 'ADD',
  DELETE: 'DELETE',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
};
/**
 * Loading of the list of documents only
 */
export const loading = (state: IDocumentState) => ({
  ...state,
  loading: true,
});
/**
 * Mark error true in case of any API error
 */
export const error = (state: IDocumentState) => ({
  ...state,
  error: true,
  loading: false,
});
/**
 * Add documents on GET success
 */
export const success = (state: IDocumentState, action: any) => ({
  ...state,
  items: action.payload,
  loading: false,
});
/**
 * Remove a document from state based on slug which is unique
 */
export const deleteDocument = (state: IDocumentState, { payload }: any): IDocumentState => ({
  ...state,
  items: state.items.filter((item: IDocument) => item.slug !== payload),
});
/**
 * Add a new document to state, expected from upload response
 */
export const addDocument = (state: IDocumentState, { payload }: any): IDocumentState => ({
  ...state,
  items: [payload, ...state.items],
});

// @TODO check why types are failing with handleActions
export const documentsReducer: any = handleActions({
  [DOCUMENT_ACTION_TYPES.LOADING]: loading,
  [DOCUMENT_ACTION_TYPES.ERROR]: error,
  [DOCUMENT_ACTION_TYPES.SUCCESS]: success,
  [DOCUMENT_ACTION_TYPES.DELETE]: deleteDocument,
  [DOCUMENT_ACTION_TYPES.ADD]: addDocument,
}, initialState);