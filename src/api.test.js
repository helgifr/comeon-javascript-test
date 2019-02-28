import api from './api';

describe('API functions', () => {
  it('should be a successful login', async () => {
    const url = '/login';
    const data = {
      username: 'rebecka',
      password: 'secret',
    };
    const { result } = await api.post(url, data);
    expect(result.status).toEqual('success');
  });
});