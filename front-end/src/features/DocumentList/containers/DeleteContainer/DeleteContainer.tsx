import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withState } from 'recompose';
import { connect } from 'react-redux';
import { Component, ReactNode } from 'react';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import {
  IDocument,
  deleteService,
  deleteDocumentAction,
  errorAction,
} from '../../../../domains/Documents';
import { Loader } from '../../../../components';
import { styles } from '../../../../styles';

interface IDeleteContainerProps {
  deleteDocument: typeof deleteDocumentAction;
  error: typeof errorAction;
  item: IDocument;
  loading: boolean;
  setLoading: any;
}

/**
 * Handle deletion for API
 * @TODO move logic to sagas if time left
 */
export class DeleteContainer extends Component<IDeleteContainerProps> {
  public render(): ReactNode {
    return (
      <IconButton
        aria-label="Delete"
        onClick={this.handleDelete}
        style={styles.deleteButton}
      >
        {/*@TODO better loading indicator*/}
        <Loader loading={this.props.loading}>
          <Delete />
        </Loader>
      </IconButton>
    )
  }
  
  private handleDelete = async () => {
    this.props.setLoading(true);
    try {
      await deleteService(this.props.item);
      await this.props.setLoading(false);
      this.props.deleteDocument(this.props.item.slug);
    } catch (e) {
      await this.props.setLoading(false);
      this.props.error(e.response ? e.response.data.error : e.message);
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  deleteDocument: deleteDocumentAction,
  error: errorAction,
}, dispatch);

export default withState('loading', 'setLoading', false)(
  connect(null, mapDispatchToProps)(DeleteContainer),
);