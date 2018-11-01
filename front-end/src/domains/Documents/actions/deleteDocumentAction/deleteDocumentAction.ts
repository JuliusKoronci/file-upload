import { createAction } from 'redux-actions';
import { DOCUMENT_ACTION_TYPES } from '../../reducers';

export const deleteDocumentAction = createAction(DOCUMENT_ACTION_TYPES.DELETE);