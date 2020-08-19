import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('Should render', ()=>{
    const header = wrapper.find('.App-header');
    expect(header.length).toBe(1);
  });

});