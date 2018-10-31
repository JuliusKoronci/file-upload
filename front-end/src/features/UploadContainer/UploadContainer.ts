import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IUploadFormProps, UploadForm } from '../UploadForm';

const mapDispatchToProps = (dispatch: Dispatch): any => bindActionCreators(
  { handleUpload: () => null },
  dispatch,
);

export const UploadContainer = connect<{}, Pick<IUploadFormProps, 'handleUpload'>>(null, mapDispatchToProps)(UploadForm);