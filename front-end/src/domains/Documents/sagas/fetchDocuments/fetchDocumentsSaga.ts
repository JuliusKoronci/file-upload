import { AxiosResponse } from 'axios';
import { effects, SagaIterator } from 'redux-saga';
import { createAction } from 'redux-actions';

import { GET_DOCUMENTS } from '../../actions/getDocumentsAction';
import { documentsService } from '../../services';
import { DOCUMENT_ACTION_TYPES } from '../../reducers';
import { IDocument } from '../../types';

export function* fetchDocuments(): SagaIterator {
  try {
    yield effects.put(createAction(DOCUMENT_ACTION_TYPES.LOADING)());
    const documents: AxiosResponse<IDocument[]> = yield effects.call(documentsService);
    yield effects.put(createAction(DOCUMENT_ACTION_TYPES.SUCCESS)(documents.data));
  } catch (e) {
    yield effects.put(createAction(DOCUMENT_ACTION_TYPES.ERROR)());
  }
}

export function* fetchDocumentsSaga(): SagaIterator {
  yield effects.takeLatest(GET_DOCUMENTS, fetchDocuments);
}