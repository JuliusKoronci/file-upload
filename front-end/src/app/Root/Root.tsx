import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import DevTools from '../../common/DevTools';

import { isProd } from '../../common/Process';

export interface IRootProps {
  store: Store<{}>;
}

export default class Root extends React.Component<IRootProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.props.children}
          {!isProd() && <DevTools />}
        </div>
      </Provider>
    );
  }
}
