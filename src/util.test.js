import { getLocalStore, setLocalStore } from './util';

describe('utility', () => {
  it('should store items in localStorage', () => {
    const data = { data: 'atad' };
    setLocalStore('key', data);
    expect(getLocalStore('key')).toMatchObject(data);
  });
});