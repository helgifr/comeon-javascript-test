import React from 'react';
import LoginForm from './LoginForm';
import { shallow } from 'enzyme';

describe('LoginForm component', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const wrapper = shallow(
    <LoginForm
      username=""
      password=""
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
  const usernameInput = wrapper.find('input[name="username"]');
  const passwordInput = wrapper.find('input[name="password"]');
  const formField = wrapper.find('form');

  it('should be empty in both input fields', () => {
    expect(usernameInput.props().value).toEqual('');
    expect(passwordInput.props().value).toEqual('');
  });

  it('should call the onChange function when input is changed', () => {
    usernameInput.simulate('change', { target: { name: 'username', value: 'jack' } });
    expect(handleChange).toHaveBeenCalledWith({ target: { name: 'username', value: 'jack' } });
    passwordInput.simulate('change', { target: { name: 'password', value: 'black' } });
    expect(handleChange).toHaveBeenCalledWith({ target: { name: 'password', value: 'black'} });
  });

  it('should call the handleSubmit function when input is changed', () => {
    formField.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
})