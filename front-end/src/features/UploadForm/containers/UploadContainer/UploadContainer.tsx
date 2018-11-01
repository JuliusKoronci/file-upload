import { AxiosResponse } from 'axios';
import { Component, ReactNode } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { withState } from "recompose";
import { bindActionCreators, Dispatch } from 'redux';
import { Input } from '../../components/Input';
import {
  addDocumentAction,
  errorAction,
  IDocument,
  uploadService,
} from '../../../../domains/Documents';

interface IUploadContainerProps {
  addDocument: typeof addDocumentAction;
  error: typeof errorAction;
  loading: boolean;
  setLoading: any;
}

/**
 * Handling upload logic outside of the domain as domain needs to concern only
 * with data and not ui state
 * @TODO move logic to sagas if time left
 */
class UploadContainer extends Component<IUploadContainerProps> {
  public render(): ReactNode {
    return <Input
      handleUpload={this.handleUpload}
      loading={this.props.loading}
    />
  }
  
  private handleUpload = async (file: File, callbalck: () => void) => {
    this.props.setLoading(true);
    try {
      const document: AxiosResponse<IDocument> = await uploadService(file);
      this.props.addDocument(document.data);
    } catch (e) {
      this.props.error(e.response ? e.response.data.error : e.message);
    }
    this.props.setLoading(false);
    callbalck();
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    addDocument: addDocumentAction,
    error: errorAction,
  },
  dispatch,
);

export default withState('loading', 'setLoading', false)(
  connect(null, mapDispatchToProps)(UploadContainer),
);