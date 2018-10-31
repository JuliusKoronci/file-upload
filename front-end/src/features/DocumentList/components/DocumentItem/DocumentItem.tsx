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
import { CloudDownload, Delete, Folder } from '@material-ui/icons';
import { IDocument } from '../../../../domains/Documents';

interface IDocumentItemProps {
  item: IDocument;
}

export const DocumentItem: SFC<IDocumentItemProps> = ({ item }) => {
  const downloadNewTab = () => window.open(item.link, '_blank');
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Folder />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.title}
        secondary={item.mime}
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Download" onClick={downloadNewTab}>
          <CloudDownload />
        </IconButton>
        <IconButton aria-label="Delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};