import * as React from 'react';
import { mount } from 'enzyme';
import { IconButton } from '@material-ui/core';
import { Loader } from '../../../../../components/Loader';

import { DeleteContainer, mapDispatchToProps } from '../DeleteContainer';


describe('mapDispatchToProps', () => {
  it('should return the correct actions', () => {
    expect(Object.keys(mapDispatchToProps(jest.fn()))).toEqual(['deleteDocument', 'error']);
  });
});

describe('DeleteContainer', () => {
  const rendered = mount(<DeleteContainer
    deleteDocument={jest.fn()}
    error={jest.fn()}
    item={{ slug: 'test', name: 'test', link: 'http://link', type: 'jpg' }}
    loading={false}
    setLoading={jest.fn()}
  />);
  const renderedLoading = mount(<DeleteContainer
    deleteDocument={jest.fn()}
    error={jest.fn()}
    item={{ slug: 'test', name: 'test', link: 'http://link', type: 'jpg' }}
    loading={true}
    setLoading={jest.fn()}
  />);
  it('should render IconButton', () => {
    expect(rendered.find(IconButton).length).toEqual(1);
  });
  it('should render Loader', () => {
    expect(renderedLoading.find(Loader).length).toEqual(1);
  });
});