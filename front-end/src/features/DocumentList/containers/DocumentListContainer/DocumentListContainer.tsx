import { connect } from 'react-redux';
import { documentsSelector } from '../../../../domains/Documents/selectors/selectDocuments';
import { IAppState } from '../../../../types/IAppState';
import { DocumentList } from '../../components/DocumentList';

const mapStateToProps = (state: IAppState) => ({
  documentState: documentsSelector(state),
});

export const DocumentListContainer = connect(mapStateToProps)(DocumentList);