import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { getDocumentsAction } from '../../domains/Documents';

interface IDocumentsProviderProps {
  children: React.ReactNode;
  getDocumentsAction: typeof getDocumentsAction;
}

export class DocumentsProvider extends Component<IDocumentsProviderProps> {
  public componentDidMount() {
    this.props.getDocumentsAction();
  }
  
  public render() {
    return this.props.children;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getDocumentsAction }, dispatch);

export default connect(null, mapDispatchToProps)(DocumentsProvider);