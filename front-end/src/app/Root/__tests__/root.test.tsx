import { shallow } from 'enzyme';
import * as React from 'react';
import { IAppState } from '../../../types/IAppState';
import createStore from '../../createStore';
import Root from '../Root';

const RootWithStore = shallow(<Root store={createStore({} as IAppState)} />);

describe('Root', () => {
  it('should exist',  () => {
    expect(RootWithStore).toBeDefined();
  });
});
