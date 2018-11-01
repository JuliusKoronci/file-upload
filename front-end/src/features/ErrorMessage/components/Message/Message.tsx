import { SFC } from 'react';
import * as React from 'react';

import { Chip } from '@material-ui/core';
import { Error } from '@material-ui/icons';

interface IMessageProps {
  message?: string
}

/**
 * Display an error message if set
 */
export const Message: SFC<IMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (<Chip
    icon={<Error />}
    label={message}
    color="secondary"
  />)
};