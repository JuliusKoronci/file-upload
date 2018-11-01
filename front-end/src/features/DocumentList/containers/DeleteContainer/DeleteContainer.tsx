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
} from '../../../../domains/Documents';
import { Loader } from '../../../../components';
import { styles } from '../../../../styles';

interface IDeleteContainerProps {
  loading: boolean;
  setLoading: any;
  item: IDocument;
  deleteDocument: typeof deleteDocumentAction;
}

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
      // @TODO just update the domain error for demo only
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  deleteDocument: deleteDocumentAction,
}, dispatch);

export default withState('loading', 'setLoading', false)(
  connect(null, mapDispatchToProps)(DeleteContainer),
);