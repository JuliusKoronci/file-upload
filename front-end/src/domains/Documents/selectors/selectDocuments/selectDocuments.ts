import { createSelector, Selector } from 'reselect';
import { IDocumentState } from '../..';
import { IAppState } from '../../../../types/IAppState';

export const selectDocumentState = (state: IAppState) => state.documents;

export const documentsSelector: Selector<IAppState, IDocumentState> = createSelector(
  selectDocumentState,
  (documentState: IDocumentState) => documentState,
);