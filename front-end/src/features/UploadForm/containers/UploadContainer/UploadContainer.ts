import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IInputProps, Input } from '../../components/Input';

const mapDispatchToProps = (dispatch: Dispatch): any => bindActionCreators(
  { handleUpload: () => null },
  dispatch,
);

export const UploadContainer = connect<{}, Pick<IInputProps, 'handleUpload'>>(null, mapDispatchToProps)(Input);