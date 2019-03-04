import React from 'react';
import GamesList from './GamesList';
import { shallow } from 'enzyme';

describe('GamesList Component', () => {
  it('should return null if the game list is empty', () => {
    const component = shallow(<GamesList games={[]} />);
    expect(component.getElement()).toBeNull();
  });
});