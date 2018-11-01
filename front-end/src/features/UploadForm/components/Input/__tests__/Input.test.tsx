import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../Input';


describe('Message', () => {
  it('should render snapshot', () => {
    expect(toJson(shallow(<Input
      handleUpload={jest.fn()}
      loading={false}
    />))).toMatchSnapshot();
  });
});