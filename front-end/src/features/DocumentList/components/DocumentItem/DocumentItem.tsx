import { SFC } from 'react';
import * as React from 'react';

import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { CloudDownload, Folder } from '@material-ui/icons';
import { DeleteContainer } from '../../containers/DeleteContainer';
import { IDocument, getDownloadLink } from '../../../../domains/Documents';

interface IDocumentItemProps {
  item: IDocument;
}

export const DocumentItem: SFC<IDocumentItemProps> = ({ item }) => {
  const downloadNewTab = () => window.open(getDownloadLink(item), '_blank');
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Folder />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.name}
        secondary={item.type}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Download" onClick={downloadNewTab}>
          <CloudDownload />
        </IconButton>
        <DeleteContainer item={item} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};