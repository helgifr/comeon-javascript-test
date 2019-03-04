import React from 'react';
import Search from './Search';
import { shallow } from 'enzyme';

describe('Search Component', () => {
  it('should call the handleSearch function with the value typed in search input', () => {
    const handleSearch = jest.fn();
    const wrapper = shallow(<Search handleSearch={handleSearch} />);
    const input = wrapper.find('input');
    const value = 'star';
    input.simulate('change', value);
    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith(value);
  });
});