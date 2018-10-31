import { SFC } from 'react';
import * as React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../app/api';

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
  const downloadNewTab = () => window.open(`${BASE_URL}download/${item.slug}`, '_blank');
  const handleDelete = () => axios.delete(`delete/${item.slug}`);
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
        <IconButton
          aria-label="Delete"
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};