import { createAction } from 'redux-actions';
import { DOCUMENT_ACTION_TYPES } from '../../reducers';

export const addDocumentAction = createAction(DOCUMENT_ACTION_TYPES.ADD);