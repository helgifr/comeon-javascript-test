/**
 * Make sure the API is running
 */

import api from './api';

describe('API functions', () => {
  it('should be a successful login', async () => {
    const url = '/login';
    const data = {
      username: 'rebecka',
      password: 'secret',
    };
    let { result } = await api.post(url, data);
    // Test with rebecka
    expect(result.status).toEqual('success');

    data.username = 'eric';
    data.password = 'dad';
    ({ result } = await api.post(url, data));
    // Test with eric
    expect(result.status).toEqual('success');

    data.username = 'stoffe';
    data.password = 'rock';
    ({ result } = await api.post(url, data));
    // Test with stoffe
    expect(result.status).toEqual('success');
  });

  it('should logout successfully', async () => {
    const url = '/logout';
    const data = { username: 'rebecka' };
    const { result } = await api.post(url, data);
    expect(result.status).toBe('success');
  });

  it('should return the list of categories that contain "id" and "name"', async () => {
    const url = '/categories';
    const { result: categories } = await api.get(url);

    const categoryProps = {
      id: expect.any(Number),
      name: expect.any(String),
    };

    categories.forEach(category => {
      expect(category).toMatchObject(categoryProps);
    });
  });


  it('should return a list of games', async () => {
    const url = '/games';
    const { result: games } = await api.get(url);
    const gameProps = {
      name: expect.any(String),
      description: expect.any(String),
      code: expect.any(String),
      icon: expect.any(String),
      categoryIds: expect.any(Array)
    };

    games.forEach(game => {
      expect(game).toMatchObject(gameProps);
      const { categoryIds } = game;
      categoryIds.forEach(id => {
        expect(id).toEqual(expect.any(Number));
      });
    });
  });
});