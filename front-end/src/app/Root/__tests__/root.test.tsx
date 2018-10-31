import { shallow } from 'enzyme';
import * as React from 'react';
import createStore from '../../createStore';
import Root from '../Root';

const RootWithStore = shallow(<Root store={createStore({})} />);

describe('Root', () => {
  it('should exist',  () => {
    expect(RootWithStore).toBeDefined();
  });
});
