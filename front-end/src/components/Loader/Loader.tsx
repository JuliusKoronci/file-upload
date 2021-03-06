import { CSSProperties, SFC } from 'react';
import * as React from 'react';

import { CircularProgress } from '@material-ui/core';

interface ILoaderProps {
  loading: boolean;
  children: React.ReactChildren
}

const style = {
  textAlign: 'center',
} as CSSProperties;

/**
 * Simple Loading indicator
 *
 * @param {boolean} loading
 * @param {React.Children} children  - any children
 * @constructor
 */
export const Loader: SFC<ILoaderProps & any> = ({ loading = false, children }) => {
  if (loading) {
    return (
      <div style={style}>
        <CircularProgress color="secondary" size={20} />
      </div>
    );
  }
  
  return children;
};