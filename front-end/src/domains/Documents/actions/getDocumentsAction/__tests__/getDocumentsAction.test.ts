import { getDocumentsAction } from '../getDocumentsAction';

describe('getDocumentsAction', () => {
  it('should return correct action type', () => {
    expect(getDocumentsAction()).toEqual({ type: 'GET_DOCUMENTS' });
  });
});