import { List } from '@material-ui/core';
import { SFC } from 'react';
import * as React from 'react';


import { IDocumentState } from '../../../../domains/Documents';
import { Loader } from '../../../../components';

import { DocumentItem } from '../DocumentItem';


interface IDocumentListProps {
  documentState: IDocumentState
}

export const DocumentList: SFC<IDocumentListProps> = ({ documentState }) => (
  <Loader loading={documentState.loading}>
    <List>
      {documentState.items.map(item => <DocumentItem
        item={item} key={item.slug}
      />)}
    </List>
  </Loader>
);