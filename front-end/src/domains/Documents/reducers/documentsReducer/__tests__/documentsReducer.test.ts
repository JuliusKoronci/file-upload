import { IDocument } from '../../../types';
import {
  addDocument,
  deleteDocument,
  documentsReducer,
  error, IDocumentState,
  initialState,
  loading,
  success,
} from '../documentsReducer';

describe('documentsReducer', () => {
  it('should return default state if no relevant action dispatched', () => {
    expect(documentsReducer(undefined, { type: 'test' })).toEqual(initialState);
  });
  it('should set loading to true', () => {
    expect(loading(initialState).loading).toEqual(true);
  });
  it('should set loading to false and error to true', () => {
    expect(error(initialState, { payload: 'error' }).loading).toEqual(false);
    expect(error(initialState, { payload: 'error' }).error).toEqual('error');
  });
  it('should set loading to false and payload to items', () => {
    const action = { payload: ['test'], type: '' } as any;
    expect(success(initialState, action).loading).toEqual(false);
    expect(success(initialState, action).items).toEqual(action.payload);
  });
  it('should add a document to state', () => {
    const action = { payload: { test: 'test' } };
    expect(addDocument(initialState, action).items).toEqual([action.payload]);
  });
  it('should delete a document by slug', () => {
    const state = { ...initialState, items: [...initialState.items] };
    state.items.push({ slug: 'test' } as IDocument);
    expect(deleteDocument(state as IDocumentState, { payload: 'test' })).toEqual(initialState);
  });
});