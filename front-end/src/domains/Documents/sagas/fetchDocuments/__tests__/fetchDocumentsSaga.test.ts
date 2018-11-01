import { effects } from 'redux-saga';
import { createAction } from 'redux-actions';
import { DOCUMENT_ACTION_TYPES } from '../../../reducers';
import { GET_DOCUMENTS } from '../../../actions';
import { documentsService } from '../../../services';
import { fetchDocumentsSaga, fetchDocuments } from '../fetchDocumentsSaga';

describe('fetchDocumentsSaga', () => {
  it('should watch for correct action', () => {
    const generator = fetchDocumentsSaga();
    expect(generator.next().value).toEqual(effects.takeLatest(GET_DOCUMENTS, fetchDocuments))
  });
});

describe('fetchDocuments', () => {
  const generator = fetchDocuments();
  it('should dispatch loading start', () => {
    expect(generator.next().value).toEqual(effects.put(createAction(DOCUMENT_ACTION_TYPES.LOADING)()));
  });
  it('should call service', () => {
    expect(generator.next().value)
      .toEqual(effects.call(documentsService));
  });
  it('should dispatch success with response', () => {
    expect(generator.next({
      data: [{
        link: 'http://link',
        name: 'test',
        slug: 'test',
        type: 'jpg',
      }],
    }).value)
      .toEqual(effects.put(createAction(DOCUMENT_ACTION_TYPES.SUCCESS)([{
        link: 'http://link',
        name: 'test',
        slug: 'test',
        type: 'jpg',
      }])));
  });
  it('should be finished', () => {
    expect(generator.next().value)
      .toEqual(undefined);
  });
  it('should dispatch error if thrown', () => {
    const errorGenerator = fetchDocuments() as any;
    errorGenerator.next();
    expect(errorGenerator.throw('error').value)
      .toEqual(effects.put(createAction(DOCUMENT_ACTION_TYPES.ERROR)()));
  });
  it('should dispatch error if thrown 2', () => {
    const errorGenerator = fetchDocuments() as any;
    errorGenerator.next();
    errorGenerator.next();
    expect(errorGenerator.throw('error').value)
      .toEqual(effects.put(createAction(DOCUMENT_ACTION_TYPES.ERROR)()));
    expect(errorGenerator.next().value)
      .toEqual(undefined);
  });
});