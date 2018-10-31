import { effects } from 'redux-saga';
import { fetchDocumentsSaga } from './Documents';

export default function* rootSaga() {
  yield effects.all([
    effects.call(fetchDocumentsSaga),
  ]);
}
