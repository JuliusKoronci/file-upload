import {
  documentsReducer,
  error,
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
    expect(error(initialState).loading).toEqual(false);
    expect(error(initialState).error).toEqual(true);
  });
  it('should set loading to false and payload to items', () => {
    const action = { payload: ['test'], type: '' } as any;
    expect(success(initialState, action).loading).toEqual(false);
    expect(success(initialState, action).items).toEqual(action.payload);
  });
});