import React from 'react';
import { shallow } from 'enzyme';

import LoginBar from '../LoginBar';

const setUp = (props={}) => {
  return shallow(<LoginBar {...props} />);
}

describe('LoginBar Component', () => {
  let wrapper;
  let onLogin = jest.fn();
  const props = {
      onLogin
  };

  beforeEach(() => {
      wrapper = setUp(props);
      onLogin.mockClear();
  });

  it('Should Render a Greeting Message', ()=>{
      const paragraph = wrapper.find('.Message');
      expect(paragraph.length).toBe(1);
  });

  it('Should call onLogin function', ()=>{
      const mockFn = onLogin;
      const button = wrapper.find('.LoginButton');
      button.simulate('click');
      expect(mockFn).toHaveBeenCalled();
      expect(button.length).toBe(1);
  });

});