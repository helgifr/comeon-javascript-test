import React from 'react';
import { User } from './User';
import { shallow } from 'enzyme';

const user = {
  name: 'Rebecka Awesome',
  avatar: 'images/avatar/rebecka.jpg',
  event: 'Last seen gambling on Starburst.',
  password: 'secret'
}

describe('User Component', () => {

  const mockLogoutfn = jest.fn();

  it('should call the logout function when the logout button is clicked', () => {
    const wrapper = shallow(
      <User
        user={user}
        logout={mockLogoutfn}
      />
    );
    wrapper.find('.logout.button').simulate('click');
    expect(mockLogoutfn).toHaveBeenCalledTimes(1);
  });
});