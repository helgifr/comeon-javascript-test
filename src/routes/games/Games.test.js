import React from 'react';
import Games from './Games';
import Loading from '../../components/loading';
import { mount, shallow } from 'enzyme';
import waitUntil from 'async-wait-until';
import { MemoryRouter } from 'react-router-dom';
import { setLocalStore } from '../../util';

// In order to stop redux from connecting to child components
jest.mock("react-redux", () => {
  return {
    connect: (mapStateToProps, mapDispatchToProps) => (
      ReactComponent
    ) => ReactComponent
  };
});

describe('Games route component', () => {

  const component = shallow(<Games />);

  it('should use the Loading component when fetching games', () => {
    expect(component.contains(<Loading />)).toEqual(true);
  });

  it('should receive the games from the api', async () => {
    await waitUntil(() => component.state('games') !== undefined);
    const gameProps = {
      name: expect.any(String),
      description: expect.any(String),
      code: expect.any(String),
      icon: expect.any(String),
      categoryIds: expect.any(Array)
    };
    const games = component.state('games');
    games.forEach(game => {
      expect(game).toMatchObject(gameProps);
    });
  });

  // To pass the PropTypes requirement of User Component
  // since the user has to be logged in to use this route
  // and the user is fetched from localstorage
  setLocalStore('player', {});

  it('should filter games when typing in the search bar', async () => {
    const mounted = mount(
      <MemoryRouter>
        <Games />
      </MemoryRouter>
    );
    const gamesInst = mounted.find(Games).instance();
    await waitUntil(() => gamesInst.state.games !== undefined);
    mounted.update();
    const input = mounted.find('input');
    input.simulate('change', { target: { name: 'search', value: 'star' }});
    expect(mounted.find('.game.item').length).toBe(1);
    input.simulate('change', { target: { name: 'search', value: 'sta' }});
    expect(mounted.find('.game.item').length).toBe(2);
  });

  it('should filter games also based on category', async () => {
    const mounted = mount(
      <MemoryRouter>
        <Games />
      </MemoryRouter>
    );
    const gamesInst = mounted.find(Games).instance();
    await waitUntil(() => gamesInst.state.games !== undefined);
    mounted.update();
    const categories = mounted.find('.category.item');
    categories.at(1).simulate('click');
    expect(mounted.find('.game.item').length).toBe(3);
    categories.at(2).simulate('click');
    expect(mounted.find('.game.item').length).toBe(3);
  });

});