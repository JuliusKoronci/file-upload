import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DocumentList } from '../DocumentList';


describe('DocumentList', () => {
  it('should render snapshot', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        loading: false,
        loaded: true,
        error: false,
        items: [{
          slug: 'test',
          name: 'test',
          link: 'http://link',
          type: 'jpg',
        }],
      }}
    />))).toMatchSnapshot();
  });
  it('should render snapshot with empty list', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        loading: false,
        loaded: true,
        error: false,
        items: [],
      }}
    />))).toMatchSnapshot();
  });
  it('should render snapshot with loading', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        loading: true,
        loaded: true,
        error: false,
        items: [],
      }}
    />))).toMatchSnapshot();
  });
  it('should render snapshot with error', () => {
    expect(toJson(shallow(<DocumentList
      documentState={{
        loading: false,
        loaded: true,
        error: 'some error',
        items: [],
      }}
    />))).toMatchSnapshot();
  });
});