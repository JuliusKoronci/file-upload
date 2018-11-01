import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Message } from '../Message';


describe('Message', () => {
  it('should render snapshot', () => {
    expect(toJson(shallow(<Message
      message="my awesome message"
    />))).toMatchSnapshot();
  });
  it('should render snapshot without a message', () => {
    expect(toJson(shallow(<Message />))).toMatchSnapshot();
  });
});