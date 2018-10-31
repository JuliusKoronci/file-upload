import { List } from '@material-ui/core';
import { SFC } from 'react';
import * as React from 'react';
import { IDocument } from '../../../../domains/Documents';

import { DocumentItem } from '../DocumentItem';


interface IDocumentListProps {
  items: IDocument[]
}

export const DocumentList: SFC<IDocumentListProps> = ({ items }) => (
  <List>
    {items.map(item => <DocumentItem item={item} key={item.slug} />)}
  </List>
);