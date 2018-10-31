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
import { Delete, Folder } from '@material-ui/icons';
import { IDocument } from '../../../../domains/Documents';

interface IDocumentItemProps {
  item: IDocument;
}

export const DocumentItem: SFC<IDocumentItemProps> = ({ item }) => (
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
      <IconButton aria-label="Delete">
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);