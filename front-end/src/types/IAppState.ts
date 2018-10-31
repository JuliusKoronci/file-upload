import { IDocumentState, documentsReducerName } from '../domains/Documents';

export interface IAppState {
  [documentsReducerName]: IDocumentState;
}