import * as React from 'react';

import * as devTools from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';

import LogMonitor from 'redux-devtools-log-monitor';

const DevTools = devTools.createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

export default DevTools;
