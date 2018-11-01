import { createAction } from 'redux-actions';
import { DOCUMENT_ACTION_TYPES } from '../../reducers';

/**
 * Dispatch error programmatically
 */
export const errorAction = createAction(DOCUMENT_ACTION_TYPES.ERROR);