import { effects } from 'redux-saga';
import rootSaga from '../sagas';

const generator = rootSaga();

describe('rootSaga', () => {
  it('should initialize all sagas', () => {
    expect(generator.next().value).toEqual(
      effects.all([]),
    );
    expect(generator.next().done).toEqual(true);
  });
});
