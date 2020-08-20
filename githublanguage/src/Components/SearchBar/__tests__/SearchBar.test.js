import checkPropTypes from 'check-prop-types';
import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from '../SearchBar';

const setUp = (props={}) => {
  return shallow(<SearchBar {...props} />);
}

const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.Name);
  return propsErr;
};

describe('SearchBar Component', () => {

  let wrapper;
  let onSearch = jest.fn();
  const props = {
      onSearch
  };

  beforeEach(() => {
    wrapper = setUp(props);
    onSearch.mockClear();
  });
  
  describe('Checking PropTypes', () => {

    it('Should NOT throw a warning', () => {
        const expectedProps = {
            onSearch: () => {}
        };
        const propsError = checkProps(SearchBar, expectedProps);
        expect(propsError).toBeUndefined();
    });
  });

  describe('Checking Renders', () => {

    it('Should Render a Instructions Message', ()=>{
      const paragraph = wrapper.find('.Message');
      expect(paragraph.length).toBe(1);
    });

    it('Should Render a Input Field', ()=>{
      const input = wrapper.find('.InputField');
      expect(input.length).toBe(1);
    });

    it('Should Render a SearchButton', ()=>{
      const button = wrapper.find('.SearchButton');
      expect(button.length).toBe(1);
    });
  
  });

  describe('Checking Methods', () => {

    it('Should emit onSearch function when onClick is called', ()=>{
      // let onSearch = jest.fn();
      const mockFn = onSearch;
      const button = wrapper.find('.SearchButton');
      button.simulate('click');
      expect(mockFn).toHaveBeenCalled();
    });

    it('Should update state when handleChange is called', ()=>{
      let classInstance = wrapper.instance();
      let e = { target : { value : "Test Username" } };
      classInstance.handleChange(e);
      const newState = classInstance.state.username;
      expect(newState).toBe("Test Username");
    });

  });

});