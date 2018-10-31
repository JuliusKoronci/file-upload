import { effects } from 'redux-saga';
import rootSaga from '../sagas';
import { fetchDocumentsSaga } from '../Documents';

const generator = rootSaga();

describe('rootSaga', () => {
  it('should initialize all sagas', () => {
    expect(generator.next().value).toEqual(
      effects.all([
        effects.call(fetchDocumentsSaga),
      ]),
    );
    expect(generator.next().done).toEqual(true);
  });
});
