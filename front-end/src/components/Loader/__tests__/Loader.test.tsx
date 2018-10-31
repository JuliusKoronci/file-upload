import * as React from 'react';
import { shallow } from 'enzyme';
import { CircularProgress } from '@material-ui/core';
import { Loader } from '../Loader';

describe('Loader', () => {
  const loading = shallow(
    <Loader loading={true}>
      <p className="test">test</p>
    </Loader>,
  );
  const notLoading = shallow(
    <Loader>
      <p className="test">test</p>
    </Loader>,
  );
  it('should render the CircularLoader', () => {
    expect(loading.find(CircularProgress).length).toEqual(1);
  });
  it('should render content if not loading', () => {
    expect(notLoading.text()).toEqual('test');
  });
});