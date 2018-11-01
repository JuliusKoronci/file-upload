import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DocumentList } from '../DocumentList';


describe('DocumentList', () => {
  it('should render snapshot', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        error: false,
        items: [{
          link: 'http://link',
          name: 'test',
          slug: 'test',
          type: 'jpg',
        }],
        loaded: true,
        loading: false,
      }}
    />))).toMatchSnapshot();
  });
  it('should render snapshot with empty list', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        error: false,
        items: [],
        loaded: true,
        loading: false,
      }}
    />))).toMatchSnapshot();
  });
  it('should render snapshot with loading', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        error: false,
        items: [],
        loaded: true,
        loading: true,
      }}
    />))).toMatchSnapshot();
  });
  it('should render snapshot with error', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        error: 'some error',
        items: [],
        loaded: true,
        loading: false,
      }}
    />))).toMatchSnapshot();
  });
});