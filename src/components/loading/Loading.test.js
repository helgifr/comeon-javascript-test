import React from 'react';
import Loading from './Loading';
import { shallow } from 'enzyme';

describe('Loading Component', () => {

  jest.useFakeTimers();
  const loading = shallow(<Loading />);

  it('should start with returning "null"', () => {
    expect(loading.getElement()).toBeNull();
  });

  it('should render after 300ms', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 300);
    jest.runAllTimers();
    expect(loading.getElement()).not.toBeNull();
  });
  
  it('should clear timeout when unmounting', () => {
    loading.unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});