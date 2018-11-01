import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DocumentItem } from '../DocumentItem';


describe('DocumentItem', () => {
  it('should render snapshot', () => {
    expect(toJson(shallow(<DocumentItem
      item={{ slug: 'test', name: 'test', link: 'http://link', type: 'jpg' }}
    />))).toMatchSnapshot();
  });
});