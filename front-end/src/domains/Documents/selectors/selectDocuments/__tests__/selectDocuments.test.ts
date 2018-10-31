import { documentsSelector, selectDocumentState } from '../selectDocuments';

const mockState = { documents: { items: [] } };

describe('documentsSelector', () => {
  it('should return documents state from mock', () => {
    expect(documentsSelector(mockState as any)).toEqual({ items: [] });
  });
});
describe('selectDocumentState', () => {
  it('should return documents state from mock', () => {
    expect(selectDocumentState(mockState as any)).toEqual({ items: [] });
  });
});